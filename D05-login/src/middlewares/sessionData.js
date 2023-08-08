const userSession = (req,res,next) => {
    if(req.body.email) {
        res.locals.email = req.body.email;
    }
    next();
}

export default userSession;