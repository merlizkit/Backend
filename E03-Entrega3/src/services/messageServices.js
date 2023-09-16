import MessagesDaoMongoDB from "../daos/mongodb/messagesDao.js";
const messagesDao = new MessagesDaoMongoDB();

//import MessagesDaoFS from '../daos/filesystem/messagesDao.js';
//const messagesDao = new MessagesDaoFS();

export const getAllServices = async () => {   
    try {
        const response = await messagesDao.getAll();
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const getByIdServices = async (id) => {   
    try {
        const item = await messagesDao.getById(id);
        if(!item) return false;
        else return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const createMsgServices = async (obj) => {   
    try {
        const newProd = await messagesDao.createMsg(obj);
        if(!newProd) return false;
        else return newProd;
    }
    catch (err) {
        console.log(err);
    }
}

export const updateMsgServices = async (id, obj) => {   
    try {
        const item = await messagesDao.updateMsg(id,obj);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteMsgServices = async (id) => {   
    try {
        const item = await messagesDao.deleteMsg(id);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}

export const deleteMsgsServices = async (id) => {   
    try {
        const item = await messagesDao.deleteMsgs(id);
        return item;
    }
    catch (err) {
        console.log(err);
    }
}