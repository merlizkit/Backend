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
            console.log(error);
            throw new Error(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if(userExist) {
                const passValid = isValidPassword(password, userExist)
                if(!passValid) return false; else return userExist;
            }
            else return false;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    async getByEmail(email){
        try {
          const userExist = await UserModel.findOne({email});
          if(userExist) return userExist
          else return false
        } catch (error) {
            console.log(error)
        }
      }

    async getById(id){
    try {
        const userExist = await UserModel.findById(id)
        if(userExist) return userExist
        else return false
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    }
}
