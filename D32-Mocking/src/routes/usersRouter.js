import { Router } from "express";
import { getByIdDTO, logout } from "../controllers/userControllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';
import { create } from "../controllers/cartController.js";
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

    .get('/github', passport.authenticate('github',{scope:['user:email']}))
    
    .get('/githubcallback', passport.authenticate('github',{
        failureRedirect:'/error-login',
        successRedirect: '/products',
        passReqToCallback: true
    }), getByIdDTO)


export default router;