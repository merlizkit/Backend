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
            res.redirect('/tickets');
        } catch (error) {
            req.logger.error(error.message);
        }
    }

    async findByUser (req, res, next) {
        try {
            const { email } = req.user
            const response = await ticketServices.findByUser({purchaser: email});
            console.log({tickets: response});
            res.render('tickets',{tickets: response});
        } catch (error) {
            req.logger.error(error.message);
        }
    }
};  