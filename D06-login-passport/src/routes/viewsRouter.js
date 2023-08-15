import { Router } from 'express';
import * as controller from '../controllers/viewControllers.js';
import { userSession } from '../middlewares/sessionData.js';
const router = Router();

router.get('/', (req,res) => { 
    res.render('login')
});
router.get('/cart/:cid', controller.getCart);
router.get('/products', userSession, controller.getProducts);
router.get('/chat', (req, res) => { res.render('chat') });

router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/error-login', controller.errorLogin);
router.get('/error-register', controller.errorRegister);
router.get('/profile', controller.profile);

export default router;