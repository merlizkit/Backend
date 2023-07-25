import CartDaoMongoDB from "../daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB();

//import CartDaoFS from '../daos/filesystem/cartDao.js';
//const cartDao = new CartDaoFS();

export const getCartsServices = async () => {   
    try {
        const response = await cartDao.getCarts();
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const getCartByIdServices = async (id) => {   
    try {
        const item = await cartDao.getCartById(id);
        if(!item) return false;
        else return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const newCartServices = async (obj) => {   
    try {
        const newProd = await cartDao.newCart(obj);
        if(!newProd) return false;
        else return newProd;
    }
    catch (err) {
        console.log(err);
    }
}

export const updateCartServices = async (cartId, prodId) => {   
    try {
        const item = await cartDao.updateCart(cartId, prodId);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteCartServices = async (id) => {   
    try {
        const item = await cartDao.deleteCart(id);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}