import CartDaoMongoDB from "../persistence/daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB();

//import CartDaoFS from '../daos/filesystem/cartDao.js';
//const cartDao = new CartDaoFS();

export const getCarts = async () => {   
    try {
        const response = await cartDao.getCarts();
        return response;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const getCartById = async (id) => {   
    try {
        const item = await cartDao.getCartById(id);
        if(!item) return false;
        else return item;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const newCart = async (obj) => {   
    try {
        const newCart = await cartDao.newCart(obj);
        if(!newCart) return false;
        else return newCart;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const updateCart = async (cartId, prodId) => {   
    try {
        const cart = await cartDao.updateCart(cartId, prodId);
        return cart;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const updateProdQty = async (cartId, prodId, quantity) => {
    try {
        const cart = await cartDao.updateProdQty(cartId, prodId, quantity);
        return cart;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const replaceCart = async (cartId, products) => {
    try {
        const updCart = await cartDao.replaceCart(cartId, products);
        return updCart;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const removeCart = async (id) => {   
    try {
        const item = await cartDao.removeCart(id);
        return item;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const emptyCart = async (id) => {   
    try {
        const item = await cartDao.emptyCart(id);
        return item;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const removeProd = async (cartId, prodId) => {   
    try {
        const item = await cartDao.removeProd(cartId, prodId);
        return item;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}