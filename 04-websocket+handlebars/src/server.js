import express from 'express';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import ProductManager from './managers/productManagerV4.1.js';

const app = express();
const productManager = new ProductManager(__dirname + '/db/products.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

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
    
    socket.emit('allProducts', await productManager.getProducts());

    socket.on('newProduct', async (obj) => {
        await productManager.addProduct(obj);
        socketServer.emit('allProducts', await productManager.getProducts());
    })

    socket.on('deleteProduct', async (producto) => {
        await productManager.deleteProduct(producto);
        socketServer.emit('allProducts', await productManager.getProducts());
    })
})