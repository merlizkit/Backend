import { Router } from 'express';
import CartManager from '../managers/cartManagerV1.js';

const router = Router();
const cartManager = new CartManager('./carts.json');

router.get('/:cid', async(req, res) =>{
    try{
        const {cid} = req.params;
        const cartID = Number(cid);
        const cart = await cartManager.getCartById(cartID);
        if(cart){
            res.status(200).json(cart);
        } else {
            res.status(400).send({msg: `Cart id ${cid} does not exist`});
        }
    }
    catch(error){
                res.status(500).send({msg: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.newCart();
        res.status(200).json({msg: `Cart ${newCart.id} created successfully: ${newCart.products}`});
    }
    catch(error){
            res.status(500).send({msg: error.message});
    }
});

// terminar este
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        await updateCart(cartID, Cart)
        const newCart = await cartManager.newCart();
        res.status(200).json({msg: `Cart ${newCart.id} created successfully: ${newCart.products}`});
    }
    catch(error){
            res.status(500).send({msg: error.message});
    }
});

export default router;