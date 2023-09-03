import { Router } from 'express';
import { uploader } from '../middlewares/multer.js';
import {__dirname} from '../utils.js';
import * as controller from '../controllers/productContollers.js';

const router = Router();

router
    .get('/', controller.getAll)
    .get('/:pid', controller.getById)
    .post('/', controller.create)
    .put('/:pid', controller.update)
    .delete('/:pid', controller.remove)

export default router;