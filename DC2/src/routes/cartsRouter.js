import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as cartController from '../controllers/cartController.js';

const router = Router();

router.get('/:cid', cartController.getById);
router.post('/', cartController.create);
router.post('/:cid/products/:pid', cartController.updateCart);
router.put('/:cid', cartController.replaceCart);
router.put('/:cid/products/:pid', cartController.updateProdQty);
router.delete('/:cid', cartController.emptyCart);
router.delete('/:cid/products/:pid', cartController.removeProd);

export default router;