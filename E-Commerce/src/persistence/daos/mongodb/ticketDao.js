import MongoDao from "./mongoDao.js";
import { TicketModel } from "./models/ticketModel.js";

export default class TicketDaoMongo extends MongoDao {
    constructor() {
        super(TicketModel);
    }
}