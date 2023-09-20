import Controllers from './classController.js';
import TicketService from "../services/ticketServices.js";
const ticketServices = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketServices);
    }

    async generateTicket(req, res, next){
        try {
            const { _id } = req.user;
            const ticket = await ticketServices.generateTicket(_id);
            if(!ticket) createResponse(res, 404, 'Error generating ticket');
            createResponse(res, 200, ticket);
        } catch (error) {
            next(error.message);
        }
    }

};  