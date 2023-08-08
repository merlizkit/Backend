import * as service from '../services/cartServices.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getCarts();
        res.status(200).json(response);
    }
    catch (error) {
        next(error.message);
    }
}

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getCartById(cid);
        if(!cart) res.status(404).json({msg: 'Cart not found'});
            else res.status(200).json(cart);
    }
    catch (error) {
        next(error.message);
    }
}

export const create = async (req, res, next) => {
    try {
        const newCart = await service.newCart({product: []});
        if(!newCart) res.status(404).json({msg: 'Validation error'});
        else res.status(200).json(newCart);
    }
    catch (error) {
        next(error.message);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const { pid, cid} = req.params;
        const cartUpd = await service.updateCart(cid, pid);
        if(!cartUpd) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartUpd);
    }
    catch (error) {
        next(error.message);
    }
}
    
export const updateProdQty = async (req,res,next) => {
    try {
        const { pid, cid} = req.params;
        const { quantity } = req.body;
        const cartUpd = await service.updateProdQty(cid, pid, quantity);
        if(!cartUpd) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartUpd);
    }
    catch (error) {
        next(error.message);
    }
}

export const replaceCart = async (req,res,next) => {
    try {
        const {cid} = req.params;
        const prods = req.body;
        const updCart = await service.replaceCart(cid,prods);
        return updCart;
    }
    catch (error) {
        next(error.message);
    }
}

export const removeCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await service.removeCart(cid);
        if(!cartDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartDel);
    }
    catch (error) {
        next(error.message);
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDel = await service.emptyCart(cid);
        if(!cartDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(cartDel);
    }
    catch (error) {
        next(error.message);
    }
}

export const removeProd = async (req, res, next) => {
    try {
        const { pid, cid} = req.params;
        const prodDel = await service.removeProd(cid, pid);
        if(!prodDel) res.status(404).json({msg: 'Not found'});
            else res.status(200).json(prodDel);
    }
    catch (error) {
        next(error.message);
    }
}