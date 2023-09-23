import UserReqDTO from "../dtos/userReqDTO.js";
import UserResDTO from "../dtos/userResDto.js";
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
            console.log(error);
        }
    }
}