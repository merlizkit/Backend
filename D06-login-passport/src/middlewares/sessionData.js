export const userSession = (req,res,next) => {
    if(req.session.info) {
        res.locals.email = req.session.info.email;
        next();
    }
}