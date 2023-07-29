import express from 'express';
import './daos/mongodb/connection.js';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js';

import ProductDaoMongoDB from "./daos/mongodb/productDao.js";
import MessagesDaoMongoDB from "./daos/mongodb/messagesDao.js";
const productDao = new ProductDaoMongoDB();
const messagesDao = new MessagesDaoMongoDB();
//import ProductDaoFS from '../daos/filesystem/productDao.js';
//import MessagesDaoFS from '../daos/filesystem/messagesDao.js';
//const productDao = new ProductDaoFS();
//const messagesDao = new MessagesDaoFS();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const PORT = 8080
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
        console.dir(socketServer)
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
    
    /* -------------------------------- products -------------------------------- */
    socket.emit('allProducts', await productDao.getProducts());

    socket.on('newProduct', async (prod) => {
        await productDao.addProduct(prod);
        socketServer.emit('allProducts', await productDao.getProducts());
    })

    socket.on('deleteProduct', async (producto) => {
        await productDao.deleteProduct(producto);
        socketServer.emit('allProducts', await productDao.getProducts());
    })
})