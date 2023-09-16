import * as service from '../services/userServices.js';

export const response = async (req, res, next) => {
    try {
        const user = await service.getById(req.session.passport.user);
        res.json(user);
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