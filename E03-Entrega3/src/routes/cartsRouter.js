import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as cartController from '../controllers/cartController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router
    .get('/:cid', cartController.getById)
    .post('/', isAuth, cartController.create)
    .post('/:cid/products/:pid', isAuth, cartController.updateCart)
    .put('/:cid', isAuth, cartController.replaceCart)
    .put('/:cid/products/:pid', isAuth, cartController.updateProdQty)
    .delete('/:cid', isAuth, cartController.emptyCart)
    .delete('/:cid/products/:pid', isAuth, cartController.removeProd)

export default router;