import CustomError from "../../../services/errors/customErrors.js";
import EErrors from "../../../services/errors/enums.js";
import { genCartErrorMissCart, genCartErrorMissProduct } from "../../../services/errors/info.js";
import { CartModel } from "./models/cartModel.js";
import { ProductModel } from "./models/productModel.js";

export default class CartDaoMongoDB {
/* -------------------------- crear nuevo carrito -------------------------- */
    async newCart(){
        try {
            const response = await CartModel.create({products: []});
            return response;
            }
            catch (error){
                throw new Error(error.stack);
            }
        }
        
    /* ---------------------- listar los carritos creados ---------------------- */
    async getCarts(){
        try {
            const response = await CartModel.find();
            return response;
        }
        catch (error){
            throw new Error(error.stack);
        }
    }
        
    /* -------------------------- busca carrito por ID ------------------------- */
    async getCartById(cartId){
        try {
            const response = await CartModel.findById(cartId).populate('products.prodId');
            return response.toObject();
        }
        catch (error){
            CustomError.createError({
                name: 'Cart update error',
                cause: genCartErrorMissCart(cartId),
                message: 'An error occurred while adding the product to the cart',
                model: error.model.modelName || error.model,
                path: error.path,
                code: EErrors.CART_NOT_FOUND
            });
        }
    }
    
    /* ------------- actualiza datos del carrito manteniendo el id ------------- */
    async updateCart(cartId, prodId){
        try {
            const findCart = await this.getCartById(cartId);
            if(findCart) {
                const findProd = await ProductModel.findById(prodId);
                if(findProd){
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
        }
        catch (error){
            if(error.model == 'carts') {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissCart(cartId),
                    message: 'An error occurred while adding the product to the cart',
                    model: error.model.modelName || error.model,
                    path: error.path,
                    code: EErrors.CART_NOT_FOUND
                });
            } else {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissProduct(prodId),
                    message: 'An error occurred while adding the product to the cart',
                    model: error.model.modelName,
                    path: error.path,
                    code: EErrors.PRODUCT_NOT_FOUND
                });
            }
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
            if(error.model.modelName == 'carts' && error.path == '_id') {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissCart(cartId),
                    message: 'An error occurred while modifying quantities',
                    model: error.model.modelName,
                    path: error.path,
                    code: EErrors.CART_NOT_FOUND
                });
            } else {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissProduct(prodId),
                    message: 'An error occurred while modifying quantities',
                    model: error.model.modelName,
                    path: error.path,
                    code: EErrors.PRODUCT_NOT_FOUND
                });
            }
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
            if(error.model.modelName == 'carts' && error.path == '_id') {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissCart(cartId),
                    message: 'An error occurred while modifying the cart',
                    model: error.model.modelName,
                    path: error.path,
                    code: EErrors.CART_NOT_FOUND
                });
            } else {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissProduct(prodId),
                    message: 'An error occurred while modifying the cart',
                    model: error.model.modelName,
                    path: error.path,
                    code: EErrors.PRODUCT_NOT_FOUND
                });
            }
        }
    }

    /* ------------------ elimina el carrito con el ID ingresado ------------------ */
    /* --------------------------- not used in router --------------------------- */
    async removeCart(cartId){
        try {
            const response = await CartModel.findByIdAndDelete(cartId);
            return response;
        }
        catch (error){
            CustomError.createError({
                name: 'Cart deletion error',
                cause: genCartErrorMissCart(cartId),
                message: 'An error occurred while removing the cart',
                model: error.model.modelName,
                path: error.path,
                code: EErrors.CART_NOT_FOUND
            });
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
            CustomError.createError({
                name: 'Cart emtpy error',
                cause: genCartErrorMissCart(cartId),
                message: 'An error occurred while emptying the cart',
                model: error.model.modelName,
                path: error.path,
                code: EErrors.CART_NOT_FOUND
            });
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
            if(error.path == '_id') {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissCart(cartId),
                    message: 'An error occurred while removing the product from the cart',
                    path: error.path,
                    code: EErrors.CART_NOT_FOUND
                });
            } else {
                CustomError.createError({
                    name: 'Cart update error',
                    cause: genCartErrorMissProduct(prodId),
                    message: 'An error occurred while removing the product from the cart',
                    path: error.path,
                    code: EErrors.PRODUCT_NOT_FOUND
                });
            }
        }
    }
}