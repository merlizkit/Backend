import * as service from '../services/cartServices.js';

export const getAll = async (req, res, next) => {
        try {
            const response = await service.getCartsServices();
            res.status(200).json(response);
        }
        catch (error) {
            next(error.message);
        }
    }

export const getById = async (req, res, next) => {
        try {
            const id = req.params.cid;
            const cart = await service.getCartByIdServices(id);
            if(!cart) res.status(404).json({msg: 'Cart not found'});
                else res.status(200).json(cart);
        }
        catch (error) {
            next(error.message);
        }
    }

export const create = async (req, res, next) => {
        try {
            const newCart = await service.newCartServices({product: []});
            if(!newCart) res.status(404).json({msg: 'Validation error'});
            else res.status(200).json(newCart);
        }
        catch (error) {
            next(error.message);
        }
    }

export const update = async (req, res, next) => {
        try {
            const cartId = req.params.cid;
            const prodId = req.params.pid;
            const cartUpd = await service.updateCartServices(cartId, prodId);
            if(!cartUpd) res.status(404).json({msg: 'Not found'});
                else res.status(200).json(cartUpd);
        }
        catch (error) {
            next(error.message);
        }
    }

export const remove = async (req, res, next) => {
        try {
            const id = req.params.cid;
            const cartDel = await service.deleteCartServices(id);
            if(!cartDel) res.status(404).json({msg: 'Not found'});
                else res.status(200).json(cartDel);
        }
        catch (error) {
            next(error.message);
        }
    }