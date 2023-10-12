import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';
const controller = new TicketController();
const router = Router();

router.post('/', controller.create);

export default router;