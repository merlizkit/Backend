const fs = require('fs');
//fs.unlinkSync('./products.json')

class ProductManager {
    constructor (path) {
        this.path = path
        }
        
        async addProduct(title, description, price, thumbnail, code, stock){
            try {
                const productsFile = await this.getProducts();
                if (!title || !description || price === 0 || !thumbnail || !code) { // verifica que los valores estén vacios o que el precio sea 0, el stock puede ser 0.
                    console.log(`Check ${code} parameters: all parameters are mandatory, only stock can be 0`);
                    return false;
                } else {
                    const checkproduct = await this.#checkCode(code) // verifica que el código no exita.
                    if (checkproduct==='OK') {
                        const product = {
                            id: await this.#getMaxID() + 1, // busca el max id creado para crear el siguiente
                            code: code,
                            title: title,
                            description: description,
                            price: price,
                            thumbnail: thumbnail,
                            stock: stock,
                        }
                        productsFile.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                        console.log(`Product ${code} created`)
                        return `Product ${code} created`
                    } else {
                        console.log(`The product ${code} already exists`)
                        return `The product ${code} already exists`}
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
                    const estado = 'OK'
                    return estado
                } else {
                    const estado = 'Error'
                    return estado
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
                console.log(idProduct)
                return idProduct
            } else {
                console.log(`The product id ${productId} does not exists`)
                return `The product id ${productId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }

    updateProduct(productId,updatedField){ // actualiza el producto y mantiene el id

    }

    deleteProduct(productId){ // elimina el producto, con ese id, del archivo

    }
}


const manager = new ProductManager('./products.json')
// manager.getProducts()
const test = async ()=>{
    // const getProducts = await manager.getProducts()
    // console.log('Primer consulta: ', getProducts);
    await manager.addProduct('Silla pino','Silla de madera de pino barnizada',5000,'Sin imagen','PT001',0) // stock en 0 OK
    await manager.addProduct('Silla madera algarrobo','Silla de madera de algarrobo',15000,'Sin imagen','PT001',5) // Error: codigo existente
    await manager.addProduct('Silla madera blanca','Silla de madera de pino blanca',6000,'Sin imagen','PT002',10)
    await manager.addProduct('Silla madera negra','Silla de madera de pino negra',6000,'Sin imagen','PT003',10)
    await manager.addProduct('Silla madera roja','Silla de madera de pino roja',6000,'Sin imagen','PT004',10)
    await manager.addProduct('Silla plastica blanca','Silla de PVC blanca',5000,'Sin imagen','PT005',10)
    await manager.addProduct('Silla plastica negra','',5000,'Sin imagen','PT006',10) // Error: precio 0
    console.log('getProducts: ', await manager.getProducts());
}

test()