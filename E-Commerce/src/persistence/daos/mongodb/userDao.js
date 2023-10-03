import { createHash, isValidPassword } from "../../../utils.js";
import { UserModel } from "./models/userModel.js";
import CartDaoMongoDB from "./cartDao.js";
import 'dotenv/config';
const cartDao = new CartDaoMongoDB();

export default class UserDao {
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if(!existUser) {
                const cart = await cartDao.newCart();
                console.log(cart.id);
                if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
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
}
