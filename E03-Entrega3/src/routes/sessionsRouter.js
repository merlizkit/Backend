import { Router } from 'express';
import { __dirname } from '../utils.js';
import { isAuth } from '../middlewares/isAuth.js';
import { getByIdDTO } from "../controllers/userControllers.js";

const router = Router();

router
    .get('/current', getByIdDTO, isAuth, (req,res) => {
        res.render('profile');
    })

export default router;