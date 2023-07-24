import * as service from '../services/productServices.js';

export const getAll = async (req, res, next) => {
        try {
            const response = await service.getProductsServices();
            res.status(200).json(response);
        }
        catch (error) {
            next(error.message);
        }
    }

export const getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const prod = await service.getProductByIdServices(id);
            if(!prod) res.status(404).json({msg: 'Product not found'});
            else res.status(200).json(prod);
        }
        catch (error) {
            next(error.message);
        }
    }

export const create = async (req, res, next) => {
        try {
            const newProd = await service.addProductServices(req.body);
            if(!newProd) res.status(404).json({msg: 'Validation error'});
            else res.status(200).json(newProd);
        }
        catch (error) {
            next(error.message);
        }
    }

export const update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const prodUpd = await service.updateProductServices(id, req.body);
            res.json(prodUpd);
        }
        catch (error) {
            next(error.message);
        }
    }

export const remove = async (req, res, next) => {
        try {
            const { id } = req.params;
            const prodDel = await service.deleteProductServices(id);
            res.json(prodDel);
        }
        catch (error) {
            next(error.message);
        }
    }