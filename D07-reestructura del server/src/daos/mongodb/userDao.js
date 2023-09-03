import { createHash, isValidPassword } from "../../utils.js";
import { UserModel } from "./models/userModel.js";

export default class UserDao {
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    return await UserModel.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
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
