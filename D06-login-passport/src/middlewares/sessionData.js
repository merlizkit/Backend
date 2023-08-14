export const userSession = (req,res,next) => {
    console.log('sd', 'aca estoy', req.session.info);
    if(req.session.info) {
        res.locals.email = req.session.info.email;
        next();
    }
}