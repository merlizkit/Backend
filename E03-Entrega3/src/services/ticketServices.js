import Services from "./classServices.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticketDao.js";
const ticketDao = new TicketDaoMongo();
import UserRepository from "../persistence/repository/userRepository.js";
const userRepository = new UserRepository();
import ProductDaoMongoDB from "../persistence/daos/mongodb/productDao.js";
const productDao = new ProductDaoMongoDB();

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }

    async generateTicket(userId){
        try {
            const user = await userRepository.getByIdDTO(userId);
            if(!user) return false;
            let amountAcc = 0;
            for (const prod of user.cart) {
                const idProd = prod._id.toString();
                const prodDB = await productDao.getProductById(idProd);
                if(prod.quantity <= prodDB.stock){
                    const amount = prod.quantity * prodDB.price;
                    amountAcc += amount;
                }
            }
            const ticket = await ticketDao.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            });
            user.cart = [];
            user.save();
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }
}