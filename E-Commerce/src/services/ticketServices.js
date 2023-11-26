import Services from "./classServices.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticketDao.js";
const ticketDao = new TicketDaoMongo();
import UserRepository from "../persistence/repository/userRepository.js";
const userRepository = new UserRepository();
import ProductDaoMongoDB from "../persistence/daos/mongodb/productDao.js";
const productDao = new ProductDaoMongoDB();
import { getCartById, removeProd } from "./cartServices.js";

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }

    async generateTicket(userId){
        try {
            const user = await userRepository.getByIdDTO(userId);
            if(!user) return false;
            let amountAcc = 0;
            let cartError = [];
            const cart = await getCartById(user.cartId);
            for (const prod of cart.products) {
                const idProd = prod.prodId;
                const prodDB = await productDao.getById(idProd);
                if(prod.quantity <= prodDB.stock){
                    const amount = prod.quantity * prodDB.price;
                    amountAcc += amount;
                    removeProd(user.cartId, idProd)
                    const newStock = prodDB.stock - prod.quantity
                    productDao.update(idProd, {"stock": newStock})
                } else {
                    cartError.push(prod.prodId);
                }
            }
            if(amountAcc > 0) {
                const ticket = await ticketDao.create({
                    code: await this.#getMaxCode() + 1,
                    purchase_datetime: new Date(),
                    amount: amountAcc,
                    purchaser: user.email
                });
                return [ticket, cartError];
            }
        } catch (error) {
            throw new Error(error.stack);
        }
    }

    async #getMaxCode(){
        let maxCode = 0;
        const tickets = await this.getAll();
        tickets.map((ticket) => { 
          if (ticket.code > maxCode) maxCode = Number(ticket.code);                                       
        });
        return maxCode;
    }
    
    async findByUser(obj) {
        try {
            const response = await ticketDao.find(obj);
            return response
        } catch (error) {
            throw new Error(error.stack);
        }
    }
}