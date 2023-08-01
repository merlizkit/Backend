import * as service from '../services/productServices.js';

export const getProducts = async (req, res, next) => {
    try {
        const response = await service.getProducts(req.query);
        res.render('products', response);
    }
    catch (error) {
        console.log(error);
    }
}