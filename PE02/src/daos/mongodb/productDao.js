import { __dirname } from "../../utils.js";
import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDB {
    /* -------------------------- crear nuevo producto -------------------------- */
    async addProduct(product){
        try {
            for (const item of product) {
                console.log(item.stock < 0);
                if (!item.title || !item.description || !item.code || item.price == 0 || item.stock < 0 || !item.category) {
                    // verifica que los valores no estén vacios, que el precio no sea 0 y el stock sea mayor o igual a 0.
                    return `Error: some parameters missing ${item.code}`;
                } else {
                    const exists = await this.checkCode(item.code) // verifica que el código no exita.
                    if (exists === false) {
                        const response = await ProductModel.create(item);
                        return response;
                    } else {
                        return `Error: Code exists ${item.code}`;
                    }
                }
            };
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
    /* -------------------------------- paginate -------------------------------- */
    async getProductsPag(query){
        try {
            const options = {
                limit: query.limit || 10,
                page: query.page || 1,
                sort: query.sort || null
            };

            const filter = {};
            if(query.stock == 1){filter.stock = {$gt: 0}};
            if(query.category){filter.category = query.category};
            if(query.status){filter.status = query.status};

            const response = await ProductModel.paginate(filter,options);

            let link = `/api/products/?limit=${response.limit}`;
            let queryLink = '';
            if (query.sort) queryLink += `&sort=${query.sort}`;
            if (query.stock) queryLink += `&stock=1`;
            if (query.category) queryLink += `&category=${query.category}`;
            if (query.status) queryLink += `&status=${query.status}`;
            if (response.hasPrevPage) {response.prevLink = link + `&page=${response.prevPage}` + queryLink} else {response.prevLink = null};
            if (response.hasNextPage) {response.nextLink = link + `&page=${response.nextPage}` + queryLink} else {response.nextLink = null};

            return response;
            }
        catch (error){
            console.log(error);
        }
    }
    /* ------------------------------------ verifica si el codigo existe ----------------------------------- */
    async checkCode(codeProduct){
        try {
            const products = await this.getProducts();
            if (!products.find(product => product.code === codeProduct)) {
                const exists = false
                return exists
            } else {
                const exists = true
                return exists
            }    
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
            if(Object.keys(product).length === 0) {
                return 'Nothing to update'
            } else {
                if(await this.checkCode(product.code)) {
                    return 'Error: code already in use';
                } else {
                    if( product.title === '' ) {return 'Error: title cant be empty'}
                    if( product.description == '' ) {return 'Error: description cant be empty'}
                    if( product.code == '' ) {return 'Error: code cant be empty'}
                    if( product.price <= 0) {return 'Error: price must be greater than 0'};
                    if( product.stock < 0) {return 'Error: can not be less than 0'}
                    if( product.status == '' ) {return 'Error: status cant be empty'}
                    if( product.category == '' ) {return 'Error: category cant be empty'}
                    const response = await ProductModel.findByIdAndUpdate( prodId, product, {new: true});
                    return response;
                };
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------ elimina el producto con el ID ingresado ------------------ */
    async deleteProduct(prod){
        try {
            const code = await ProductModel.findOne({ code: prod });
            if(!code) {
                const response = await ProductModel.findByIdAndDelete(prod);
                return response;
            } else {
                const response = await ProductModel.findOneAndDelete({code: prod});
                return response;
            }
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