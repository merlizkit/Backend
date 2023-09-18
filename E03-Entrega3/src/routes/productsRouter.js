import { Router } from 'express';
import { uploader } from '../middlewares/multer.js';
import {__dirname} from '../utils.js';
import * as controller from '../controllers/productContollers.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router
    .get('/', controller.getAll)
    .get('/:pid', controller.getById)
    .post('/', isAuth, controller.create)
    .put('/:pid', isAuth, controller.update)
    .delete('/:pid', isAuth, controller.remove)

export default router;