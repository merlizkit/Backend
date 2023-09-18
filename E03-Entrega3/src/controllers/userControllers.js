import * as service from '../services/userServices.js';

export const getByIdDTO = async (req, res, next) => {
    try {
        const user = await service.getByIdDTO(req.user.id);
        if(req.path == '/current') {
            res.locals.user = user;
            next();
        } else {
            res.json(user);
        }
    } catch (error) {
        if(!req.path) {
            if(req.path == '/current') {
                next(error.message);
            } else {
                console.log(error);
            }
        } else console.log(error);
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if(!err) res.redirect('/');
        else res.json({ msg: err });
    })
};