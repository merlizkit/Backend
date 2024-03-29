import UserRepository from "../persistence/repository/userRepository.js";
const userRepository = new UserRepository();

//import UserDaoFS from '../daos/filesystem/userDao.js';
//const userDao = new UserDaoFS();

export const getByIdDTO = async (id) => {   
    try {
        const response = await userRepository.getByIdDTO(id);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const getById = async (req, res, next) => {
    try {
        const user = await userRepository.getById(req.session.passport.user);
        res.toObject(user);
    } catch (error) {
      next(error.message);
    }
};