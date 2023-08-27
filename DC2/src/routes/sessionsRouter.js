import { Router } from 'express';
import { __dirname } from '../utils.js';
import { userSession } from '../middlewares/sessionData.js';
import passport from 'passport';

const router = Router();

router
    .get('/current', (res,req) => {
        
    }
    )

export default router;