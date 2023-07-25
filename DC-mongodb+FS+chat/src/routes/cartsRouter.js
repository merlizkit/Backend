import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as cartController from '../controllers/cartController.js';

const router = Router();

router.get('/:cid', cartController.getById)
router.post('/', cartController.create)
router.post('/:cid/products/:pid', cartController.update);
router.delete('/:cid', cartController.remove)

export default router;