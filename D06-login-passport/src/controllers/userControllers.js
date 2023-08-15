import UserDao from "../daos/mongodb/userDao.js";
const userDao = new UserDao();

export const response = async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user);
        res.toObject(user);
    } catch (error) {
      next(error.message);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(!err) res.redirect('/');
        else res.json({ msg: err });
    })
};