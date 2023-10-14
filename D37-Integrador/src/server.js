import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { __dirname, mongoStoreOptions } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import passport from 'passport';
import { initializePassport } from './config/passportConfig.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();
import MessagesDaoMongoDB from "./persistence/daos/mongodb/messagesDao.js";
import { logger, logger2 } from './utils/logger.js';
import config from './config/config.js';
const messagesDao = new MessagesDaoMongoDB();
//import ProductDaoFS from '../daos/filesystem/productDao.js';
//import MessagesDaoFS from '../daos/filesystem/messagesDao.js';
//const productDao = new ProductDaoFS();
//const messagesDao = new MessagesDaoFS();

const app = express();

app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(express.static(__dirname + '/public'))
    .use(errorHandler)
    .use(morgan('dev'))
    .use(logger)

    .engine('handlebars', handlebars.engine())
    .set('view engine', 'handlebars')
    .set('views', __dirname + '/views')

    .use(cookieParser(config.SECRET_COOKIES))
    .use(session(mongoStoreOptions))
    .use(passport.initialize())
    .use(passport.session())
    
    .use('/', logger, mainRouter.getRouter())
    
initializePassport();

const PORT = config.PORT || 8080;
const httpServer = app.listen(PORT, ()=>{
    logger2.info(`Server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    logger2.info(`User connected ${socket.id}`);

    socket.on('disconnect', () => {
        logger2.info('User disconnected');
    });

    /* ---------------------------------- chat ---------------------------------- */
    socket.on('newUser', (user)=>{
        logger2.info(`>${user} inició sesión`);
    })

    socket.on('chat:message', async(msg) =>{
        await messagesDao.createMsg(msg);
        socketServer.emit('messages', await messagesDao.getAll());
    })

    socket.emit('msg', 'bienvenido al chat');

    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user); //llega a todos, menos al que inició sesión
    })

    socket.on('chat:typing', (user)=>{
        socket.broadcast.emit('chat:typing', user)
    })
})