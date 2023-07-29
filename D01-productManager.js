class productManager {
    constructor () {
        this.products = []
        }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || price === 0 || !thumbnail || !code) { // verifica que los valores estén vacios o que el precio sea 0, el stock puede ser 0.
            console.log(`Check ${code} parameters: all parameters are mandatory, only stock can be 0`);
            return false;
          } else {
            const checkproduct = this.#checkCode(code) // verifica que el código no exita.
            if (checkproduct==='OK') {
                const product = {
                    code: code,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    id: this.#getMaxID() + 1, // busca el max id creado para crear el siguiente
                }
                this.products.push(product)
                console.log(`Product ${code} created`)
                return `Product ${code} created`
            } else {
                console.log(`The product ${code} already exists`)
                return `The product ${code} already exists`}
        }
    } 

    getProductById = (productId) => {
        const product = this.products.find(product => product.id === productId)
        if (product) {
            console.log(product)
            return product
        } else {
            console.log(`The product id ${productId} does not exists`)
            return `The product id ${productId} does not exists`
        }
    }

    getProducts=()=>{
        console.log(this.products)
        return this.products
    }

    #getMaxID = () => { // busca el ultimo ID creado
        const ids = this.products.map(product => product.id)
        if (ids.includes(1)) {
            return Math.max(...ids)
        } else {
            return 0}
    }

    #checkCode=(codeProduct)=>{ // busca un codigo de producto y devuelve OK si no existe, y Error si existe.
        if (!this.products.find(product => product.code === codeProduct)) {
            const estado = 'OK'
            return estado
        } else {
            const estado = 'Error'
            return estado
        }
    }
}


const manager = new productManager()
// manager.getProducts()
// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
// manager.getProducts()
// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)
// manager.getProductById(1)

manager.addProduct('Silla pino','Silla de madera de pino barnizada',5000,'Sin imagen','PT001',0) // stock en 0 OK
manager.addProduct('Silla madera algarrobo','Silla de madera de algarrobo',15000,'Sin imagen','PT001',5) // Error: codigo existente
manager.addProduct('Silla madera blanca','Silla de madera de pino blanca',6000,'Sin imagen','PT002',10)
manager.addProduct('Silla madera negra','Silla de madera de pino negra',6000,'Sin imagen','PT003',10)
manager.addProduct('Silla madera roja','Silla de madera de pino roja',6000,'Sin imagen','PT004',10)
manager.addProduct('Silla plastica blanca','Silla de PVC blanca',5000,'Sin imagen','PT005',10)
manager.addProduct('Silla plastica negra','',5000,'Sin imagen','PT006',10) // Error: precio 0
manager.getProducts()
manager.getProductById(3)
manager.getProductById(7) // Error: no existe el ID