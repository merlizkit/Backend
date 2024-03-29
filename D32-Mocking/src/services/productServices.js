import ProductDaoMongoDB from "../persistence/daos/mongodb/productDao.js";
const productDao = new ProductDaoMongoDB();

//import ProductDaoFS from '../daos/filesystem/productDao.js';
//const productDao = new ProductDaoFS();

export const getAll = async (query) => {   
    try {
        const response = await productDao.getProductsPag(query);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

export const getById = async (id) => {   
    try {
        const item = await productDao.getById(id);
        if(!item) return false;
        else return item;
    }
    catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {   
    try {
        const newProd = await productDao.create(obj);
        if(!newProd) return false;
        else return newProd;
    }
    catch (error) {
        console.log(error);
    }
}

export const update = async (id, obj) => {   
    try {
        const item = await productDao.update(id,obj);
        return item;
    }
    catch (error) {
        console.log(error);
    }
}

export const remove = async (id) => {   
    try {
        const item = await productDao.remove(id);
        return item;
    }
    catch (error) {
        console.log(error);
    }
}

export const listTopN = async (listNumber) => {
    try {
        const products = await productDao.listTopN(listNumber);
        return products;
    }
    catch (error) {
        console.log(error);
    }
}