import { Router } from 'express';
import * as controller from '../controllers/viewControllers.js';
import { sessionData } from '../middlewares/sessionData.js';
const router = Router();

router
    .get('/', (req,res) => { 
    res.render('login')
    })
    .get('/cart/:cid', controller.getCart)
    .get('/products', sessionData, controller.getProducts)
    .get('/chat', (req, res) => { res.render('chat') })
    .get('/login', controller.login)
    .get('/register', controller.register)
    .get('/error-login', controller.errorLogin)
    .get('/error-register', controller.errorRegister)
    .get('/profile', controller.profile)

export default router;