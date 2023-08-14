import { Router } from "express";
import { loginUser, registerUser, logout } from "../controllers/userControllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';
const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect:'/error-register'}), registerUser);
router.post('/login', passport.authenticate('login',{failureRedirect:'/error-login'}), loginUser);
router.get('/github', passport.authenticate('github',{scope:['user:email']}));
router.get('/githubcallback', passport.authenticate('github',{
    failureRedirect:'/error-login',
    successRedirect: '/products',
    passReqToCallback: true
    }));
router.post('/logout', logout);
router.post('/private', isAuth, (req, res) => res.send('route private'));

export default router;