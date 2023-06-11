const fs = require('fs');

class ProductManager {
    constructor (path) {
        this.path = path
        }
        
        //async addProduct(title, description, price, thumbnail, code, stock){
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
                        console.log(`Product ${product.code} created`)
                        return `Product ${product.code} created`
                    } else {
                        console.log(`Could not create product ${product.code}: code already exists`)
                        return `Could not create product ${product.code}: code already exists`}
                    }
                }
                catch (error){
                    console.log(error);
                }
            }
            
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
            
        async #checkCode(codeProduct){  // busca un codigo de producto y devuelve OK si no existe, y Error si existe.
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
            
        async #getMaxID(){ // busca el ultimo ID creado
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
                
    async getProductById(productId){
        try {
            const productsFile = await this.getProducts();
            const idProduct = productsFile.find(product => product.id === productId)
            if (idProduct) {
                console.log(`Displaying product id ${productId} info: `, idProduct);
                return idProduct
            } else {
                console.log(`Error displaying product: id ${productId} does not exists`)
                return `Error displaying product: id ${productId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    //async updateProduct(productId,title, description, price, thumbnail, code, stock){ // actualiza el o los datos del producto y mantiene el id
    async updateProduct(product){ // actualiza el o los datos del producto y mantiene el id
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
                    console.log(`Product id ${productId} has been updated`);
                    return `Product id ${productId} has been updated`;
            } else {
                console.log(`Update failed: Product id ${productId} does not exists`);
                return `Update failed: Product id ${productId} does not exists`;
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    async deleteProduct(productId){ // elimina el producto, con ese id, del archivo
        try {
            const productsFile = await this.getProducts();
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition>-1){
                productsFile.splice(idPosition,1);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                console.log(`Product id ${productId} has been deleted`)
                return `Product id ${productId} has been deleted`
            } else {
                console.log(`Deletion failed: Product id ${productId} does not exists`)
                return `Deletion failed: Product id ${productId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }
}


const manager = new ProductManager('./products.json')

const product1 = {
    title:'Silla pino',
    description:'Silla de madera de pino barnizada',
    price:5000,
    thumbnail:'Sin imagen',
    code:'PT001',
    stock:0
}
const product2 = {
    title:'Silla madera algarrobo',
    description:'Silla de madera de algarrobo',
    price:15000,
    thumbnail:'Sin imagen',
    code:'PT001',
    stock:5
}
const product3 = {
    title:'Silla madera blanca',
    description:'Silla de madera de pino blanca',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT002',
    stock:10
}
const product4 = {
    title:'Silla madera negra',
    description:'Silla de madera de pino negra',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT003',
    stock:10
}
const product5 = {
    title:'Silla madera roja',
    description:'Silla de madera de pino roja',
    price:6000,
    thumbnail:'Sin imagen',
    code:'PT004',
    stock:10
}
const product6 = {
    title:'Silla plastica blanca',
    description:'Silla de PVC blanca',
    price:5000,
    thumbnail:'Sin imagen',
    code:'PT005',
    stock:10
}
const product7 = {
    title:'Silla plastica negra',
    description:'',
    price:5000,
    thumbnail:'Sin imagen',
    code:'PT006',
    stock:10
}

const productUpd1 = {
    id: 3,
    title: '',
    description: '',
    price: 8000,
    thumbnail: '',
    code: '',
    stock: ''  
}
const productUpd2 = {
    id: 7,
    title: '',
    description: '',
    price: 6500,
    thumbnail: '',
    code: '',
    stock: ''
};

const test = async ()=>{
    console.log('Complete product list: ', await manager.getProducts());
    await manager.addProduct(product1); // stock en 0 OK
    await manager.addProduct(product2); // Error: codigo existente
    await manager.addProduct(product3);
    await manager.addProduct(product4);
    await manager.addProduct(product5);
    await manager.addProduct(product6);
    await manager.addProduct(product7); // Error: sin descripción
    console.log('Complete product list: ', await manager.getProducts());
    await manager.getProductById(3);
    await manager.getProductById(7);
    await manager.updateProduct(productUpd1);
    await manager.updateProduct(productUpd2);
    await manager.getProductById(3);
    await manager.deleteProduct(4);
    await manager.deleteProduct(7);
    console.log('Complete product list: ', await manager.getProducts());
}

test()