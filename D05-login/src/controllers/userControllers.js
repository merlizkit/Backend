import UserDao from "../daos/mongodb/userDao.js";
const userDao = new UserDao();

export const registerUser = async(req, res) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        if(newUser) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.loginUser(req.body);
        if(user) {
            req.session.info = {
                loggedIn: true,
                email: user.email,
                admin: user.admin
            };
            //console.log('usercontroler',res.req.session.info.email)
            res.redirect('/products')
        } else res.redirect('/error-login')
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(!err) res.redirect('/');
        else res.json({ msg: err });
    })
};