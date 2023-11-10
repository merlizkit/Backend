import { Router } from "express";
import { getByIdDTO, logout, resetPass, updatePass, updateRole, docUpload } from "../controllers/userControllers.js";
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';
import {uploader} from '../middlewares/multer.js';
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
    .post('/reset-pass', resetPass)
    .post('/:uid/documents', uploader.fields([{ name: 'identification', maxCount: 1 }, { name: 'addressCert', maxCount: 1 }, { name: 'accountCert', maxCount: 1 }]), docUpload)

    .put('/new-pass', updatePass)
    .put('/premium/:uid', updateRole)
    
    .get('/github', passport.authenticate('github',{scope:['user:email']}))
    .get('/githubcallback', passport.authenticate('github',{
        failureRedirect:'/error-login',
        successRedirect: '/products',
        passReqToCallback: true
        }), getByIdDTO)

export default router;