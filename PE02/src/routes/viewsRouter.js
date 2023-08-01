import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('products');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

export default router;