import Services from "./classServices.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticketDao.js";
const ticketDao = new TicketDaoMongo();

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }
}