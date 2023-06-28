import { Router } from 'express';
import { __dirname } from '../utils.js';
import CartManager from '../managers/cartManagerV1.js';
import ProductManager from '../managers/productManagerV4.js';

const router = Router();
const cartManager = new CartManager(__dirname + '/db/carts.json');
const productManager = new ProductManager(__dirname + '/db/products.json');

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

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cartID = Number(cid);
        const prodID = Number(pid);
        const prodExists = await productManager.getProductById(prodID);
        if(prodExists.id == prodID) {
            const updStatus = await cartManager.updateCart(cartID, prodID);
            if(updStatus === 'OK'){
                res.status(200).json({msg: `Product ${prodID} added to cart ${cartID}`});
            } else if(updStatus === 'Error: nothing to add'){
                res.status(400).send({msg: `No products to add to cart`});
            } else {
                res.status(400).send({msg: `Cart ${cartID} not found`});
            }
        } else {
            res.status(404).send({msg: `Can't add to cart: product id ${prodID} does not exists`});
        }
    }
    catch(error){
            res.status(500).send({msg: error.message});
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartID = Number(cid);
        const delStatus = await cartManager.deleteCart(cartID);
        if(delStatus === 'OK') {
            res.status(200).json({msg: `Cart ${cartID} deleted successfully`});
        } else {
            res.status(404).json({msg: `Cart ${cartID} does not exist`});
        }
    }
    catch(error) {
        res.status(500).send({msg: error.message});
    }
})

export default router;