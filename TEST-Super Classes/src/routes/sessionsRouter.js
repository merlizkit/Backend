import { Router } from 'express';
import { __dirname } from '../utils.js';
import { isAuth } from '../middlewares/isAuth.js';
import { userSession } from '../middlewares/sessionData.js';

const router = Router();

router
    .get('/current', userSession, isAuth, (req,res) => {
        res.render('profile');
    })

export default router;