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
import 'dotenv/config';
import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();
import MessagesDaoMongoDB from "./persistence/daos/mongodb/messagesDao.js";
import { logger } from './utils/logger.js';
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

    .use(cookieParser())
    .use(session(mongoStoreOptions))
    .use(passport.initialize())
    .use(passport.session())
    
    .use('/', logger, mainRouter.getRouter())
    
initializePassport();

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    /* ---------------------------------- chat ---------------------------------- */
    socket.on('newUser', (user)=>{
        console.log(`>${user} inició sesión`);
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