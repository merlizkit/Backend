import { Router } from 'express';
import * as controller from '../controllers/viewControllers.js';
const router = Router();

router.get('/', (req,res) => {
    res.render('index')
})
router.get('/products', controller.getProducts);
router.get('/chat', (req, res) => {
    res.render('chat')
});

export default router;