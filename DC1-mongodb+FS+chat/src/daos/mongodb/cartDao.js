import { CartModel } from "./models/cartModel.js";
import { ProductModel } from "./models/productModel.js";

export default class CartDaoMongoDB {
/* -------------------------- crear nuevo carrito -------------------------- */
    async newCart(cart){
        try {
            const response = await CartModel.create({products: []});
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
            const findProd = await ProductModel.findById(prodId);
            if(!findProd){
                return 'Product does not exists';
            } else {
                const response = await CartModel.findOneAndUpdate( 
                    { _id: cartId }, 
                    { $set: { 'carts.products.quantity': +1 } },
                    { arrayFilters: [ {'carts.products.prodID': prodId} ] },
                    {new: true},
                    {upsert: true});
                console.log(response);
                return response;
            }
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