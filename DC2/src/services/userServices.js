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