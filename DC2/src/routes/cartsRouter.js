import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as cartController from '../controllers/cartController.js';

const router = Router();

router
    .get('/:cid', cartController.getById)
    .post('/', cartController.create)
    .post('/:cid/products/:pid', cartController.updateCart)
    .put('/:cid', cartController.replaceCart)
    .put('/:cid/products/:pid', cartController.updateProdQty)
    .delete('/:cid', cartController.emptyCart)
    .delete('/:cid/products/:pid', cartController.removeProd)

export default router;