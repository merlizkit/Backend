import * as prodService from '../services/productServices.js';
import * as cartService from '../services/cartServices.js';
import * as userService from '../services/userServices.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await prodService.getAll(req.query);
        res.render('products', response );
    }
    catch (error) {
        req.logger.error(error.message);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const response = await cartService.getCartById(req.params.cid);
        res.render('cart', response);
    }
    catch (error) {
        req.logger.error(error.message);
    }
}

export const getUsersDTO = async (req, res, next) => {
    try {
        const users = await userService.getAllDTO();
        const response = { users };
        res.render('adminmenu', response);
    }
    catch (error) {
        req.logger.error(error.message);
    }
}

export const register = (req, res) => { res.render('register') };
export const errorRegister = (req, res) => { res.render('errorRegister') };
export const login = (req, res) => { res.render('login') };
export const logout = (req, res) => { res.render('logout') };
export const errorLogin = (req, res) => { res.render('errorLogin') };
export const profile = (req, res) => { res.render('profile') };


