import * as cartService from '../services/cartServices.js';
import * as prodService from '../services/productServices.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await cartService.getCarts();
        res.status(200).json(response);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);
        if(!cart) res.status(404).json({msg: 'Cart not found'});
            else res.status(200).json(cart);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const create = async (req, res, next) => {
    try {
        const newCart = await cartService.newCart({product: []});
        if(!newCart) res.status(404).json({msg: 'Validation error'});
        else res.status(200).json(newCart);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const { pid, cid } = req.params;
        const authUpd = await prodService.getById(pid);
        if (req.user.email == authUpd.owner) res.status(404).json({msg: 'Cant add owned products to own cart'});
        else {
            const cartUpd = await cartService.updateCart(cid, pid);
            if(!cartUpd) res.status(404).json({msg: 'Not found'});
                else res.redirect(`/cart/${cid}`);
        };
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}
    
export const updateProdQty = async (req,res,next) => {
    try {
        const { pid, cid} = req.params;
        const { quantity } = req.body;
        const cartUpd = await cartService.updateProdQty(cid, pid, quantity);
        if(!cartUpd) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartUpd);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const replaceCart = async (req,res,next) => {
    try {
        const {cid} = req.params;
        const prods = req.body;
        const updCart = await cartService.replaceCart(cid,prods);
        return updCart;
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const removeCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await cartService.removeCart(cid);
        if(!cartDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartDel);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await cartService.emptyCart(cid);
        if(!cartDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartDel);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}

export const removeProd = async (req, res, next) => {
    try {
        const { pid, cid} = req.params;
        const prodDel = await cartService.removeProd(cid, pid);
        if(!prodDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(prodDel);
    }
    catch (error) {
        req.logger.error(error.stack);
    }
}