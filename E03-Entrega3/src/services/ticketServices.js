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
            const cart = await getCartById(user.cartId);
            for (const prod of cart.products) {
                const idProd = prod.prodId;
                const prodDB = await productDao.getProductById(idProd);
                if(prod.quantity <= prodDB.stock){
                    const amount = prod.quantity * prodDB.price;
                    amountAcc += amount;
                    removeProd(user.cartId, idProd)
                }
            }
            //console.log('qty ', cart.products);
            //updateProdQty(user.cartId, cart.products.prodId, cart.products.quantity)
            const ticket = await ticketDao.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date(),
                amount: amountAcc,
                purchaser: user.email
            });
            user.cartId = [];
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }
}