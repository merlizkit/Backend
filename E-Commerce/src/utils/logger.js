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
        new transports.Console({ 
            level: 'debug',
            format: combine(
                timestamp({
                    format: 'YYYYMMDD HH:mm:ss'
                }),
                    colorize(addColors(customParams.colors)),
                    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
            ), })
    ]
} else {
    envTransports = [
        new transports.Console({ 
            level: 'info', 
            format: combine(
                timestamp({
                    format: 'YYYYMMDD HH:mm:ss'
                }),
                    colorize(addColors(customParams.colors)),
                    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
            ), }),
        new transports.File({ 
            filename: __dirname + '/logs/errors.log', 
            level: 'error',
            format: combine(
                timestamp({
                    format: 'YYYYMMDD HH:mm:ss'
                }),
                    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
            ), })
    ]
};

const logConfig = {
    levels: customParams.levels,
    transports: envTransports,
    env: process.env.ENVIRONMENT
};

export const logger = (req,res,next) => {   
    req.logger = createLogger(logConfig);    
    next();
};

// logger.transports.file.level = 'info';  --> le cambio el nivel de error a la configuración