import MongoDao from "./mongoDao.js";
import { createHash, isValidPassword } from "../../../utils.js";
import { UserModel } from "./models/userModel.js";
import CartDaoMongoDB from "./cartDao.js";
import config from '../../../config/config.js';
import jwt from 'jsonwebtoken';
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
                req.logger.debug(cart.id);
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

    async updateRole(uid, {role: role}) {
        try {
            if(role === 'user') return await this.update(uid, {role: role})
            else {
                const user = await this.getById(uid);
                if(!user) return false;
                else {
                    if(user.status != true) return false;
                    else return await this.update(uid, {role: role}); 
                }
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
                const updUser = await this.update(uid, {$push: {documents: docs}});
                const status = await UserModel.find({_id: uid}).find({"documents.name": { $all: ['identification', 'addressCert', 'accountCert'] }})
                console.log('status ', status);
                return updUser
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}
