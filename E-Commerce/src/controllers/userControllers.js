import * as service from '../services/userServices.js';
import { createResponse } from '../utils.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import factory from '../persistence/daos/factory.js';
const { userDao } = factory;

export const getAllDTO = async (req, res, next) => {
    try {
        const response = await service.getAllDTO();
        res.status(200).json(response);
    } catch (error) {
        throw new Error(error.stack);
    }
};

export const getByIdDTO = async (req, res, next) => {
    try {
        const user = await service.getByIdDTO(req.user.id);
        if(req.path == '/current') {
            res.locals.user = user;
            next();
        } else {
            res.json(user);
        }
    } catch (error) {
        if(!req.path) {
            if(req.path == '/current') {
                next(error.message);
            } else {
                req.logger.error(error.stack);
            }
        } else req.logger.error(error.stack);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(!err) res.redirect('/');
        else res.json({ msg: err });
    })
};

export const resetPass = async (req, res, next) => {
    try {
        const { email } = req.body;
        const tokenResetPass = await service.resetPass(email);
        if(!tokenResetPass) return createResponse(res, 404, 'Email not sent')
        res.cookie('tokenpass', tokenResetPass);
        req.logger.debug('usrCont - resetPass - token: '+ tokenResetPass)
        return createResponse(res, 200, 'Email reset password sent OK'); 
    } catch (error) {
        req.logger.error(error.stack);
    }
};

export const updatePass = async (req, res, next) => {
    try {
        const user = await checkToken(req);
        const { password } = req.body;
        const { tokenpass } = req.cookies;
        if(!tokenpass) return createResponse(res, 403, 'Token expired');
        const updPass = await service.updatePass(user, password);
        if(!updPass) return createResponse(res, 404, 'New password cant be the same as the old one');
        res.clearCookie('tokenpass');
        return createResponse(res, 200, 'Password updated');
    } catch (error) {
        req.logger.error(error.stack);
    }
};

export const checkToken = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return createResponse(res, 401, 'Unauthorized');
    
    try {
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, config.SECRET_KEY_JWT);
        req.logger.debug(JSON.stringify(decode));
        const user = await userDao.getById(decode.userId);
        if (!user) return createResponse(res, 400, "Unauthorized");
        return user;
    } catch (error) {
        req.logger.error(error.stack);
        return createResponse(res, 401, 'Unauthorized');
    }
  };

export const updateRole = async (req, res, next) => {
    try {
        const { uid } = req.params;
        // const { role } = req.body;
        // console.log('uid', uid);
        // console.log('role', role);
        const updStat = await service.updateRole(uid);
        if (!updStat) return createResponse(res, 400, "User not found or admin");
        return createResponse(res, 200, 'Role updated');
    } catch (error) {
        req.logger.error(error.stack);
    }
};

export const docUpload = async (req, res, next) => {
    try {
        const { uid } = req.params;
        let docs = [];
        if(req.files.identification) {
            const ident = {
                name: 'identification',
                reference: req.files.identification[0].path
            }
            docs.push(ident)
        }
        if(req.files.addressCert) {
            const ident = {
                name: 'addressCert',
                reference: req.files.addressCert[0].path
            }
            docs.push(ident)
        }
        if(req.files.accountCert) {
            const ident = {
                name: 'accountCert',
                reference: req.files.accountCert[0].path
            }
            docs.push(ident)
        }
        const uplDocs = await service.docUpload(uid, docs);
        if (!uplDocs) return createResponse(res, 400, "Unauthorized");
        return createResponse(res, 200, 'Document uploaded successfully');
    } catch (error) {
        req.logger.error(error.stack);
    }
};

export const removeById = async (req, res) => {
    try {
        const response = await service.removeById(req.params.uid);
        if (!response) return createResponse(res, 400, "Unautorized");
        else res.redirect(`/adminmenu`)
    } catch (error) {
        req.logger.error(error.stack);
    }
};

/* --------- borra los usuarios que no tuvieron conexiones recientes -------- */
export const removeOld = async (req, res) => {
    try {
        const response = await service.removeOld();
        if (!response) return createResponse(res, 400, "Unautorized");
        return createResponse(res, 200, `${response.deletedCount} unused users deleted successfully`);
    } catch (error) {
        req.logger.error(error.stack);
    }
};