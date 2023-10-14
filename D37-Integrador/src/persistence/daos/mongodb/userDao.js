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
            req.logger.error(error.message);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExists = await this.getByEmail(email);
            if(userExists) {
                const passValid = isValidPassword(password, userExists)
                if(!passValid) return false;
                else return userExists;
            }
            else return false;
        } catch (error) {
            req.logger.error(error.message);
        }
    };

    async getByEmail(email){
        try {
            const userExists = await UserModel.findOne({email});
            if(userExists) return userExists; 
            else return false;
        } catch (error) {
            req.logger.error(error.message);
        }
      }

    async getById(id){
        try {
            const userExists = await UserModel.findById(id)
            if(userExists) return userExists
            else return false
        } catch (error) {
            req.logger.error(error.message);
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
            req.logger.error(error.message);
        }
    };

    async updatePass(user, password) {
        try {
            const isEqual = isValidPassword(password, user);
            if(isEqual) return false;
            const newPass = createHash(password);
            return await this.update(user._id, { password: newPass })
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
