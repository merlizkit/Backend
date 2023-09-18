import ProductDaoMongoDB from "../persistence/daos/mongodb/productDao.js";
const productDao = new ProductDaoMongoDB();

//import ProductDaoFS from '../daos/filesystem/productDao.js';
//const productDao = new ProductDaoFS();

export const getProducts = async (query) => {   
    try {
        const response = await productDao.getProductsPag(query);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const getProductById = async (id) => {   
    try {
        const item = await productDao.getProductById(id);
        if(!item) return false;
        else return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const addProduct = async (obj) => {   
    try {
        const newProd = await productDao.addProduct(obj);
        if(!newProd) return false;
        else return newProd;
    }
    catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (id, obj) => {   
    try {
        const item = await productDao.updateProduct(id,obj);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteProduct = async (id) => {   
    try {
        const item = await productDao.deleteProduct(id);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const listTopN = async (listNumber) => {
    try {
        const products = await productDao.listTopN(listNumber);
        return products;
    }
    catch (err) {
        console.log(err);
    }
}