import { Router } from "express";
import { getByIdDTO, logout, resetPass, updatePass } from "../controllers/userControllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';
import { create } from "../controllers/cartController.js";
import { checkToken } from "../middlewares/checkToken.js";
const router = Router();

router
    .post('/register', passport.authenticate('register',{
        failureRedirect:'/error-register',
        successRedirect:'/login'
    }), create)

    .post('/login', passport.authenticate('login',{
        failureRedirect:'/error-login',
        successRedirect: '/products'
    }), getByIdDTO)

    .post('/logout', logout)
    .post('/private', isAuth, (req, res) => res.send('route private'))
    
    .post('/reset-pass', resetPass) //revisar, como use passport no tengo eso. En el ejemplo era con jwt
    .put('/new-pass', updatePass) //revisar, como use passport no tengo eso. En el ejemplo era con jwt

    .get('/github', passport.authenticate('github',{scope:['user:email']}))
    
    .get('/githubcallback', passport.authenticate('github',{
        failureRedirect:'/error-login',
        successRedirect: '/products',
        passReqToCallback: true
    }), getByIdDTO)


export default router;