import { Router } from 'express';
import { uploader } from '../middlewares/multer.js';
import {__dirname} from '../utils.js';
import * as controller from '../controllers/productContollers.js';

const router = Router();

router.get('/', controller.getAll)
router.get('/:pid', controller.getById)
router.post('/', controller.create)
router.put('/:pid', controller.update)
router.delete('/:pid', controller.remove)

export default router;