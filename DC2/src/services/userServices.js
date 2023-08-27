import UserDaoMongoDB from "../daos/mongodb/userDao.js";
const userDao = new UserDaoMongoDB();

//import UserDaoFS from '../daos/filesystem/userDao.js';
//const userDao = new UserDaoFS();

export const getUserSession = async (user) => {   
    try {
        const response = await userDao.userSession(user);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

export const getById = async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user);
        res.toObject(user);
    } catch (error) {
      next(error.message);
    }
};