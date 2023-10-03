import { __dirname } from '../utils.js';
import { addColors, createLogger, format, transports } from 'winston';
const { combine, printf, timestamp, colorize } = format;

const customParams = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'black redBG',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'green'
    }
};

let envTransports;
if(process.env.ENVIRONMENT === 'development') {
    envTransports = [
        new transports.Console({ level: 'debug' })
    ]
} else {
    envTransports = [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: __dirname + '/logs/errors.log', level: 'error' })
    ]
};
console.log(envTransports);
const logConfig = {
    levels: customParams.levels,
    format: combine(
        timestamp({
            format: 'YYYYMMDD HH:mm:ss'
        }),
            colorize(addColors(customParams.colors)),
            printf((info) => `${info.level} | ${info.timestamp} | ${info.method} | "${info.url}" | ${info.message}`)
    ),
    transports: envTransports,
    env: process.env.ENVIRONMENT
};

export const logger = (req,res,next) => {   
    req.logger = createLogger(logConfig);
    // req.logger.debug    (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    // req.logger.http     (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    // req.logger.info     (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    // req.logger.warning  (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    // req.logger.error    (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    // req.logger.fatal    (`${req.method} en "${req.url}"${req.message ? (' | '+req.message) : ''}`);
    
    next();
};

// logger.transports.file.level = 'info';  --> le cambio el nivel de error a la configuración