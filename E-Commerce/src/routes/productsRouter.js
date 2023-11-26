import { Router } from 'express';
import { __dirname } from '../utils.js';
import * as controller from '../controllers/productContollers.js';
import { isAuth } from '../middlewares/isAuth.js';
import {uploader} from '../middlewares/multer.js';

const router = Router();

router
    .get('/', controller.getAll)
    .get('/:pid', controller.getById)
    .post('/', isAuth, uploader.array('thumbnails',10), controller.create)
    .put('/:pid', isAuth, controller.update)
    .delete('/:pid', controller.remove)

export default router;