import { Router } from 'express';
import * as controller from '../controllers/viewControllers.js';
import { sessionData } from '../middlewares/sessionData.js';
import { isAuth } from '../middlewares/isAuth.js';
import config from '../config/config.js';
const router = Router();

router
    .get('/', (req,res) => { 
        if(!req.user) res.render('login');
        else res.redirect('/products');
    })
    .get('/cart/:cid', sessionData, controller.getCart)
    .get('/products', sessionData, controller.getAll)
    .get('/chat', sessionData, isAuth, (req, res) => { res.render('chat') })
    .get('/login', controller.login)
    .get('/register', controller.register)
    .get('/error-login', controller.errorLogin)
    .get('/error-register', controller.errorRegister)
    .get('/profile', controller.profile)
    .get('/loggerTest', (req,res) => {
        res.locals.env = config.ENVIRONMENT;
        res.locals.logger = req.logger;
        req.logger.debug("Prueba logger debug")
        req.logger.http("Prueba logger http")
        req.logger.info("Prueba logger info")
        req.logger.warning("Prueba logger warning")
        req.logger.error("Prueba logger error")
        req.logger.fatal("Prueba logger fatal")
        res.render('loggerTest')
    })
    .get('/adminmenu', sessionData, isAuth, controller.getUsersDTO)

export default router;