import Controllers from './classController.js';
import TicketService from "../services/ticketServices.js";
const ticketServices = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketServices);
    }

    async generateTicket(req, res, next){
        try {
            const { id: userId } = req.user;
            const ticket = await ticketServices.generateTicket(userId);
            if(!ticket) res.status(404).json({msg: 'Error generating ticket'});
            res.status(200).json(ticket);
        } catch (error) {
            req.logger.error(error.message);
        }
    }

};  