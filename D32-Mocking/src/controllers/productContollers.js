import * as service from '../services/productServices.js';

export const getAll = async (req, res, next) => {
        try {
            const response = await service.getAll(req.query);
            res.status(200).json(response);
        }
        catch (error) {
            next(error.message);
        }
    }

export const getById = async (req, res, next) => {
        try {
            const {pid} = req.params;
            const prod = await service.getById(pid);
            if(!prod) res.status(404).json({msg: 'Product not found'});
            else res.status(200).json(prod);
        }
        catch (error) {
            next(error.message);
        }
    }

export const create = async (req, res, next) => {
        try {
            const newProd = await service.create(req.body);
            if(!newProd) res.status(404).json({msg: 'Creation error'});
            else res.status(200).json(newProd);
        }
        catch (error) {
            next(error.message);
        }
    }

export const update = async (req, res, next) => {
        try {
            const {pid} = req.params;
            const prodUpd = await service.update(pid, req.body);
            if(!prodUpd) res.status(404).json({msg: 'Update error'});
                else res.status(200).json(prodUpd);
        }
        catch (error) {
            next(error.message);
        }
    }

export const remove = async (req, res, next) => {
        try {
            const {pid} = req.params;
            const prodDel = await service.remove(pid);
            if(!prodDel) res.status(404).json({msg: 'Not found'});
                else res.status(200).json(prodDel);
        }
        catch (error) {
            next(error.message);
        }
    }