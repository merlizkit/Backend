import UserDao from "../daos/mongodb/userDao.js";
const userDao = new UserDao();

export const registerResponse = (req, res, next) => {
    try {
      res.json({
        msg: "Register ok",
        session: req.session,
      });
    } catch (error) {
      next(error.message);
    }
};

export const loginResponse = async (req, res, next) => {
    try {
      const user = await userDao.getById(req.session.passport.user);
      res.json({
        msg: "Login ok",
        user,
      });
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

export const githubResponse = async (req, res, next) => {
    try {
      // console.log(req.user)
      const { first_name, last_name, email, isGithub } = req.user;
      res.json({
        msg: "Register/Login Github OK",
        session: req.session,
        userData: {
          first_name,
          last_name,
          email,
          isGithub,
        },
      });
    } catch (error) {
      next(error.message);
    }
  };