import * as service from '../services/productServices.js';


export const getAll = async (req, res, next) => {
        try {
            const response = await service.getAll(req.query);
            res.status(200).json(response);
        }
        catch (error) {
        req.logger.error(error.stack);
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
        req.logger.error(error.stack);
        }
    }

export const create = async (req, res, next) => {
        try {
            let owner;
            if(req.user.role != 'admin') { owner = req.user.email};
            const newProd = await service.create(
                Object.keys(req.body).reduce((result, key) => {
                    result[key] = { ...req.body[key], owner };
                    return result[0];
                }, {})
            );
            req.logger.debug('Prod id: ' + newProd._id);
            if(!newProd) res.status(404).json({msg: 'Creation error'});
            else res.status(200).json(newProd);
        }
        catch (error) {
            req.logger.error('productController '+ error.stack);
        }
    }

export const update = async (req, res, next) => {
        try {
            const {pid} = req.params;
            const authDel = await service.getById(pid);
            if (req.user.email != authDel.owner && req.user.role != 'admin') res.status(404).json({msg: 'Unauthorized'});
            else {
                const prodUpd = await service.update(pid, req.body);
                if(!prodUpd) { return res.status(404).json({msg: 'Update error'});}
                    else { return res.status(200).json(prodUpd); }
            };
        }
        catch (error) {
        req.logger.error(error.stack);
        }
    }

export const remove = async (req, res, next) => {
        try {
            const {pid} = req.params;
            const authDel = await service.getById(pid);
            if (req.user.email != authDel.owner && req.user.role != 'admin') res.status(404).json({msg: 'Unauthorized'});
            else { 
                const prodDel = await service.remove(pid);
                if(!prodDel) { return res.status(404).json({msg: 'Not found'});}
                    else {return res.status(200).json(prodDel);}
                };
        }
        catch (error) {
        req.logger.error(error.stack);
        }
    }