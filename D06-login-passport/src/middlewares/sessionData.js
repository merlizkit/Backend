export const userSession = (req,res,next) => {
    console.log('sd', req.user);
    if(req.user) {
        res.locals.user = req.user.toObject();
        next();
    }
}