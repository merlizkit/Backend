import MySQLDao from "./mysqlDao.js";
import { UserModel } from "./models/userModel.js";
import { createHash, isValidPassword } from '../../../utils.js';

export default class UserDaoMySql extends MySQLDao {
    constructor(){
        super(UserModel)
    }

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail( email );
            if(!existUser) return await this.model.create({
                ...user,
                password: createHash(password)
            });
            else return false;
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async getByEmail(email) {
        try {
            const user = await this.model.findOne({ 
                where: {
                    email: email
                }
             });
            if(user) return user;
            else return false;
        } catch (error) {
            req.logger.error(error.message);
        }
    };

    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail( email );
            if(userExist) {
                const passValid = isValidPassword(userExist, password);
                if(!passValid) return false;
                else return userExist;
            } return false;
        } catch (error) {
            req.logger.error(error.message);
        }
    }
};