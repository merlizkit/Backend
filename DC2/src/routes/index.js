import { Router } from 'express';

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import userRouter from './routes/usersRouter.js';

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .use('/api/products', productsRouter)
            .use('/api/carts', cartsRouter)
            .use('/users', userRouter)
            .use('/', viewsRouter)
    }

    getRouter() {
        return this.router;
    }
};