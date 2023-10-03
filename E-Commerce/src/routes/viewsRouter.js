import { Router } from 'express';
import * as controller from '../controllers/viewControllers.js';
import { sessionData } from '../middlewares/sessionData.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = Router();

router
    .get('/', (req,res) => { 
        if(!req.user) res.render('login');
        else res.redirect('/products');
    })
    .get('/cart/:cid', sessionData, controller.getCart)
    .get('/products', sessionData, controller.getAll)
    .get('/chat', isAuth, (req, res) => { res.render('chat') })
    .get('/login', controller.login)
    .get('/register', controller.register)
    .get('/error-login', controller.errorLogin)
    .get('/error-register', controller.errorRegister)
    .get('/profile', controller.profile)
    .get('/loggerTest', (req,res) => {
        res.locals.env = process.env.ENVIRONMENT;
        res.locals.logger = req.logger;
        console.log(req.logger);
        req.logger.info('probando')
        res.render('loggerTest')
    })

export default router;