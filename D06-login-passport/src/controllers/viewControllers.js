import * as prodService from '../services/productServices.js';
import * as cartService from '../services/cartServices.js';
import * as userService from "../services/userServices.js";

export const getProducts = async (req, res, next) => {
    try {
        // const { user: userId } = req.session?.passport || { user: null };
        // const user = await userService.getById(userId);
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

export const register = (req, res) => { res.render('register') };
export const errorRegister = (req, res) => { res.render('errorRegister') };
export const login = (req, res) => { res.render('login') };
export const logout = (req, res) => { res.render('logout') };
export const errorLogin = (req, res) => { res.render('errorLogin') };

export const profile = (req, res) => { 
    res.render('profile')
    console.log('viewcontroller', req.session);
};
