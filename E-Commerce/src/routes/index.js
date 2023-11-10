import { Router } from 'express';

import productsRouter from './productsRouter.js';
import cartsRouter from './cartsRouter.js';
import ticketsRouter from './ticketsRouter.js';
import sessionsRouter from './sessionsRouter.js';
import viewsRouter from './viewsRouter.js';
import userRouter from './usersRouter.js';
import testRouter from './testRouter.js';

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router
            .use('/api/products', productsRouter)
            .use('/api/carts', cartsRouter)
            .use('/api/tickets', ticketsRouter)
            .use('/session', sessionsRouter)
            .use('/api/users', userRouter)
            .use('/test', testRouter)
            .use('/', viewsRouter)
    }

    getRouter() {
        return this.router;
    }
};