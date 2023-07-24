import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB {
    /* -------------------------- crear nuevo producto -------------------------- */
    async addProduct(){
        try {
            const response = await ProductModel.create(product);
            return response;
            }
            catch (error){
                console.log(error);
            }
        }
        
    /* ---------------------- listar los productos creados ---------------------- */
    async getProducts(){
        try {
            const response = await ProductModel.find();
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
      
    /* -------------------------- busca producto por ID ------------------------- */
    async getProductById(productId){
        try {
            const response = await ProductModel.findById(productId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------- actualiza datos del producto manteniendo el id ------------- */
    async updateProduct(prodId, product){
        try {
            const response = await ProductModel.findByIdAndUpdate( prodId, product, {new: true});
            return response;
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------ elimina el producto con el ID ingresado ------------------ */
    async deleteProduct(productId){
        try {
            const response = await ProductModel.findByIdAndDelete(productId);
            return response;
        }
        catch (error){
            console.log(error);
        }
    }

//     /* -------------- muestra los primeros N productos de la lista -------------- */
//     async listTopN(listNumber){
//         try {
//             const response = await ProductModel.findByIdAndDelete(id);
//             return response;
//         }
//         catch (error){
//             console.log(error);
//         }
//     }   
}