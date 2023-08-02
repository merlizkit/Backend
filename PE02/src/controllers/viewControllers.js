import * as prodService from '../services/productServices.js';
import * as cartService from '../services/cartServices.js';

export const getProducts = async (req, res, next) => {
    try {
        const response = await prodService.getProducts(req.query);
        res.render('products', response);
    }
    catch (error) {
        console.log(error);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const response = await cartService.getCartById(req.params.cid);
        res.render('cart', response);
    }
    catch (error) {
        console.log(error);
    }
}