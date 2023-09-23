export const sessionData = (req,res,next) => {
    if(!req.user) {
        res.json({msg: "Session not found"});
        next();
        }
    else {
        res.locals.user = req.user.toObject();
        next();
    }
}