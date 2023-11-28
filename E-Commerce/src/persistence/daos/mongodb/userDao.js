import MongoDao from "./mongoDao.js";
import { createHash, isValidPassword } from "../../../utils.js";
import { UserModel } from "./models/userModel.js";
import CartDaoMongoDB from "./cartDao.js";
import config from '../../../config/config.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { logger2 } from "../../../utils/logger.js";
import { sendMail } from "../../../services/mailingServices.js";
const cartDao = new CartDaoMongoDB();

export default class UserDao extends MongoDao {
    constructor() {
        super(UserModel)
    }
    
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if(!existUser) {
                const cart = await cartDao.newCart();
                logger2.info(cart.id);
                if(email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                    return await UserModel.create({
                        ...user,
                        password: createHash(password),
                        cartId: cart._id,
                        role: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password),
                    cartId: cart._id
                });
            } else return false;
        } catch (error) {
            throw new Error(error.stack);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExists = await this.getByEmail(email);
            if(userExists) {
                const passValid = isValidPassword(password, userExists)
                if(!passValid) return false;
                else {
                    this.update(userExists._id, { last_connection: Date.now() });
                    return userExists
                };
            }
            else return false;
        } catch (error) {
            throw new Error(error.stack);
        }
    };

    async getByEmail(email){
        try {
            const userExists = await UserModel.findOne({email});
            if(userExists) return userExists; 
            else return false;
        } catch (error) {
            throw new Error(error.stack);
        }
      }

    async getById(id){
        try {
            const userExists = await UserModel.findById(id)
            if(userExists) return userExists
            else return false
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    /**
     * Genera el token del usuario
     * @param {*} user
     * @param {*} timeExp
     * @returns token
     */
    generateToken(user, timeExp) {
        const payload = {
            userId: user._id
        };
        const token = jwt.sign(payload, config.SECRET_KEY_JWT, {
            expiresIn: timeExp,
        });
        return token;
    }

    async resetPass(email) {
        try {
            const userExists = await this.getByEmail(email);
            if(!userExists) return false;
            else {
                const token = this.generateToken(userExists, '1h')    
                return {userExists, token};
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    };

    async updatePass(user, password) {
        try {
            const isEqual = isValidPassword(password, user);
            if(isEqual) return false;
            const newPass = createHash(password);
            return await this.update(user._id, { password: newPass })
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async updateRole(uid) {
        try {
            const user = await this.getById(uid);
            if(!user) return false;
            else {
                if(user.role === 'admin') return false;
                if(user.role === 'user') return await this.update(uid, {role: 'premium'})
                    else return await this.update(uid, {role: 'user'});
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async docUpload(uid, docs) {
        try {
            const user = await this.getById(uid);
            if(!user) return false;
            else {
                /* ------------- si existe una versión anterior de los documentos cargados, borra la referencia y el archivo ------------ */
                for (let index = 0; index < docs.length; index++) {
                    const ref = user.documents.find(doc => doc.name === docs[index].name);
                    ref ? fs.unlinkSync(ref.reference) : null;
                    await this.update(uid, {$pull: {documents: {name: docs[index].name}}});
                }

                /* ------------------ carga la nueva referencia del documento ------------------ */
                const updUser = await this.update(uid, {$push: {documents: docs}});
                return updUser
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async removeOld() {
        try {
            // const filter = {last_connection: {$lte: '2023-11-20'}}
            const filter = {
                $and: [
                    {role: {$ne: 'admin'}}, 
                    {last_connection: { $lte: new Date(new Date().setDate(new Date().getDate() - 2))}}
                ]
            };
            // const filter = {last_connection: {$lte: new Date(ISODate().getTime() - 1000 * 60 * 15)}}
            const mailDel = await this.find(filter)
            for (let index = 0; index < mailDel.length; index++) {
                await sendMail(mailDel[index], 'userDeleted');
            }
            const delUsers = await this.deleteMany(filter);
            if(!delUsers) return false;
            else return delUsers;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async removeById(uid) {
        try {
            const userExists = await this.getById(uid);
            if(!userExists) return false;
            else {
                const response = await this.delete(uid);
                if(!response) return false;
                else {
                    await sendMail(userExists, 'userDeleted')
                    return response
                };
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}
