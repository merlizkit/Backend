export const sessionData = (req,res,next) => {
    if(!req.user) {
        res.redirect('/');
        next();
        }
    else {
        res.locals.user = req.user.toObject();
        next();
    }
}