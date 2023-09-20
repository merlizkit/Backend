import { getByIdDTO } from "../services/userServices.js";

export const isAuth = async (req,res,next) => {
    try {
        const { id: userId } = req.user;
        const user = await getByIdDTO(userId);
        if(req.method != 'GET') {
            if(req.baseUrl === '/api/products') {
                if(req.isAuthenticated() && user.role == 'admin') return next();
                else res.status(401).send({ msg: 'Unauthorized' })
            }
            if(req.baseUrl === '/api/carts') {
                if(req.isAuthenticated() && user.role == 'user') return next();
                else res.status(401).send({ msg: 'Unauthorized' })
            }
        } else {
            if(req.path === '/chat')
                if(req.isAuthenticated() && user.role == 'user') 
                    return next();
                    else res.status(401).send({ msg: 'Unauthorized' })
            else next ();
        }
    } catch (error) {
        next(error.message);
    }
}