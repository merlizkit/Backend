import fs from 'fs';

export default class ProductManager {
    constructor (path) {
        this.path = path
        }
        
    /* -------------------------- crear nuevo producto -------------------------- */
    async addProduct(product){
        try {
            const productsFile = await this.getProducts();
            if (!product.title || !product.description || product.price === 0 || !product.thumbnail || !product.code) { // verifica que los valores estén vacios o que el precio sea 0, el stock puede ser 0.
                console.log(`Check ${product.code} parameters: all parameters are mandatory, only stock can be 0`);
                return false;
            } else {
                const checkproduct = await this.#checkCode(product.code) // verifica que el código no exita.
                if (checkproduct==='OK') {
                    const newProduct = {
                        ...product,
                        id: await this.#getMaxID() + 1 // busca el max id creado para crear el siguiente
                    }
                    productsFile.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                    return `Product ${product.code} created`
                } else {
                    return `Could not create product ${product.code}: code already exists`}
                }
            }
            catch (error){
                console.log(error);
            }
        }
        
    /* ---------------------- listar los productos creados ---------------------- */
    async getProducts(){
        try {
            if(fs.existsSync(this.path)){ // verificar que existe el archivo
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJs = JSON.parse(products);
                return productsJs;
            } else {
                return [] // si no existe, simula un array vacío
            }
        }
        catch (error){
            console.log(error);
        }
    }
        
    /* ------------------------------------ verifica si el codigo existe ----------------------------------- */
    async #checkCode(codeProduct){
        try {
            const productsFile = await this.getProducts();
            if (!productsFile.find(product => product.code === codeProduct)) {
                const exists = 'OK'
                return exists
            } else {
                const exists = 'Error'
                return exists
            }    
            }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------------ busca el ultimo ID creado ----------------------- */
    async #getMaxID(){
        try {
            const productsFile = await this.getProducts();
            const ids = productsFile.map(product => product.id)
            if (ids.includes(1)) {
                return Math.max(...ids)
            } else {
                return 0
            }
        }
        catch (error){
            console.log(error);
        } 
    }
                
    /* -------------------------- busca producto por ID ------------------------- */
    async getProductById(productId){
        try {
            const productsFile = await this.getProducts();
            const idProduct = productsFile.find(product => product.id === productId)
            if (idProduct) {
                return idProduct
            } else {
                return `Error displaying product: id ${productId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------- actualiza datos del producto manteniendo el id ------------- */
    async updateProduct(product){
        try {
            const productsFile = await this.getProducts();
            const productId = product.id;
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition > -1){
                    if(product.title!==''){productsFile[idPosition].title = product.title};
                    if(product.description!==''){productsFile[idPosition].description = product.description};
                    if(product.price>0){productsFile[idPosition].price = product.price};
                    if(product.thumbnail!==''){productsFile[idPosition].thumbnail = product.thumbnail};
                    if(product.code!==''){productsFile[idPosition].code = product.code};
                    if(product.stock>0){productsFile[idPosition].stock = product.stock};
                    
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                    return `Product id ${productId} has been updated`;
            } else {
                return `Update failed: Product id ${productId} does not exists`;
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------ elimina el producto con el ID ingresado ------------------ */
    async deleteProduct(productId){
        try {
            const productsFile = await this.getProducts();
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition>-1){
                productsFile.splice(idPosition,1);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return `Product id ${productId} has been deleted`
            } else {
                return `Deletion failed: Product id ${productId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }

    /* -------------- muestra los primeros N productos de la lista -------------- */
    async listTopN(listNumber){
        try {
            const productsFile = await this.getProducts();
            const slicedArray = productsFile.slice(0, listNumber);
            return slicedArray;
        }
        catch (error){
            console.log(error);
        }
    }   
}