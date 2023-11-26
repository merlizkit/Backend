import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';
import { sessionData } from '../middlewares/sessionData.js';
const controller = new TicketController();
const router = Router();

router.get('/', sessionData, controller.findByUser);

export default router;