import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as cartController from '../controllers/cartController.js';
import TicketController from '../controllers/ticketController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { sessionData } from '../middlewares/sessionData.js';

const router = Router();
const ticketController = new TicketController()

router
    .get('/:cid', cartController.getById)
    .post('/', isAuth, cartController.create)
    .post('/:cid/products/:pid', isAuth, sessionData, cartController.updateCart)
    .put('/:cid', isAuth, cartController.replaceCart)
    .put('/:cid/products/:pid', isAuth, cartController.updateProdQty)
    .put('/:cid/purchase', isAuth, ticketController.create)
    .delete('/:cid', isAuth, cartController.emptyCart)
    .delete('/:cid/products/:pid', isAuth, cartController.removeProd)

export default router;