import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB {
    constructor (path) {
        this.path = path
        }
        
    /* -------------------------- crear nuevo carrito -------------------------- */
    async newCart(){
        try {
            const response = await CartModel.create(cart);
            return response;
            }
            catch (error){
                console.log(error);
            }
        }
        
    /* ---------------------- listar los carritos creados ---------------------- */
    async getCarts(){
        try {
            const response = await CartModel.find();
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
        
    /* -------------------------- busca carrito por ID ------------------------- */
    async getCartById(cartId){
        try {
            const response = await CartModel.findById(cartId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------- actualiza datos del carrito manteniendo el id ------------- */
    async updateCart(cartId, prodId){
        try {
            const response = await CartModel.findOneAndUpdate( 
                cartId, 
                { $set: { "products.$[elem].quantity": +1 } },
                { arrayFilters: [ {"elem.prodID": prodId} ] },
                {new: true});
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------ elimina el carrito con el ID ingresado ------------------ */
    async deleteCart(cartId){
        try {
            const response = await CartModel.findByIdAndDelete(cartId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
}