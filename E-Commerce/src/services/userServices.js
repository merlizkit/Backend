import UserDao from "../persistence/daos/mongodb/userDao.js";
import UserRepository from "../persistence/repository/userRepository.js";
import { sendMail } from "./mailingServices.js";
const userRepository = new UserRepository();
const userDao = new UserDao();

//import UserDaoFS from '../daos/filesystem/userDao.js';
//const userDao = new UserDaoFS();

export const getByIdDTO = async (id) => {   
    try {
        const response = await userRepository.getByIdDTO(id);
        return response;
    }
    catch (error) {
        throw new Error(error.stack);
    }
}

export const getById = async (req, res, next) => {
    try {
        const user = await userRepository.getById(req.session.passport.user);
        res.toObject(user);
    } catch (error) {
        throw new Error(error.stack);
    }
};

export const resetPass = async (email) => {
    try {
        const { userExists: user, token } = await userDao.resetPass(email);
        if(!token) return false;
        return sendMail(user, 'resetPass', token);
    } catch (error) {
        throw new Error(error.stack);
    }
};

export const updatePass = async (user, password) => {
    try {
        return await userDao.updatePass(user, password);
    } catch (error) {
        throw new Error(error.stack);
    }
};

export const updateRole = async (uid, role) => {
    try {
        return await userDao.updateRole(uid, {role: role});
    } catch (error) {
        throw new Error(error.stack);
    }
}

export const docUpload = async (uid, docs) => {
    try {
        return await userDao.docUpload(uid, docs);
    } catch (error) {
        throw new Error(error.stack);
    }
}