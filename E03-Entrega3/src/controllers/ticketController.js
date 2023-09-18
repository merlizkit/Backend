import Controllers from './classController.js';
import TicketService from "../services/ticketServices.js";
const ticketServices = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketServices);
    }
};  