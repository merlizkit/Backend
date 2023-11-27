import UserResDTO from "../dtos/userResDTO.js";
import UserDao from "../daos/mongodb/userDao.js";
const userDao = new UserDao();

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    };

    async getByIdDTO(id) {
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async find(obj) {
        try {
            const response = await this.dao.find(obj);
            return response;
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async getAllDTO() {
        try {
            const response = await this.dao.getAll();
            let users = [];
            for (let index = 0; index < response.length; index++) {
                const { first_name, last_name, email, age, role, cartId, last_connection, _id } = new UserResDTO(response[index])
                const user = {
                    email,
                    first_name,
                    last_name,
                    age,
                    role,
                    cartId,
                    last_connection,
                    _id}
                users.push(user);
            }
            return users
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}