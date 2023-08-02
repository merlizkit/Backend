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
            const response = await CartModel.findById(cartId).populate('products.prodId');
            return response.toObject();
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
                const findProdInCart = await CartModel.findOne( { _id: cartId, 'products.prodId': prodId });
                if(!!findProdInCart){
                    const response = await CartModel.findOneAndUpdate( 
                        { _id: cartId,
                        'products.prodId': prodId }, 
                        { $inc: { 'products.$.quantity': 1 } },
                        {new: true});
                    return response;
                } else {
                const response = await CartModel.findOneAndUpdate( 
                    { _id: cartId }, 
                    { $push: { products: { prodId: prodId, quantity: 1 } } },
                    {new: true});
                return response;
                }
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* -------------------- actualiza la cantidad del carrito ------------------- */
    async updateProdQty(cartId, prodId, quantity){
        try {
            const response = await CartModel.findOneAndUpdate( 
                { _id: cartId,
                'products.prodId': prodId }, 
                { 'products.$.quantity': quantity },
                {new: true});
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    /* ---------------- reemplazar todos los productos del carro ---------------- */
    async replaceCart(cartId, products){
        try {
            const response = await CartModel.findOneAndUpdate(
                { _id: cartId},
                { products: products},
                { new: true}
            );
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    /* ------------------ elimina el carrito con el ID ingresado ------------------ */
    async removeCart(cartId){
        try {
            const response = await CartModel.findByIdAndDelete(cartId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    /* ------------------ vacía el carrito con el ID ingresado ------------------ */
    async emptyCart(cartId){
        try {
            const response = await CartModel.findOneAndUpdate(
                { _id: cartId},
                { products: [] },
                {new: true}
            );
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

    /* ------------------ elimina producto del carrito ------------------ */
    async removeProd(cartId, prodId){
        try {
            const response = await CartModel.findOneAndUpdate( 
                { _id: cartId }, 
                { $pull: { products: { prodId: prodId} } }, 
                { new: true } );
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
}