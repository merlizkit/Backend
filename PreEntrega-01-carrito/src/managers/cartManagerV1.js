import fs from 'fs';

export default class CartManager {
    constructor (path) {
        this.path = path
        }
        
    /* -------------------------- crear nuevo carrito -------------------------- */
    async newCart(){
        try {
            const cartsFile = await this.getCarts();
                const newCart = {
                    id: await this.#getMaxID() + 1, // busca el max id creado para crear el siguiente
                    products: []
                }
                cartsFile.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return newCart;
            }
            catch (error){
                console.log(error);
            }
        }
        
    /* ---------------------- listar los carritos creados ---------------------- */
    async getCarts(){
        try {
            if(fs.existsSync(this.path)){ // verificar que existe el archivo
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJS = JSON.parse(carts);
                return cartsJS;
            } else {
                return [] // si no existe, simula un array vacío
            }
        }
        catch (error){
            console.log(error);
        }
    }
        
    /* ------------------------ busca el ultimo ID creado ----------------------- */
    async #getMaxID(){
        try {
            const cartsFile = await this.getCarts();
            const ids = cartsFile.map(cart => cart.id)
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
                
    /* -------------------------- busca carrito por ID ------------------------- */
    async getCartById(cartId){
        try {
            const cartsFile = await this.getCarts();
            const idCart = cartsFile.find(cart => cart.id === cartId)
            if (idCart) {
                return idCart.products
            } else {
                return `Error displaying cart: id ${cartId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------- actualiza datos del carrito manteniendo el id ------------- */
    async updateCart(cartId, cart){
        try {
            if(Object.keys(cart).length === 0) {
                return 'Nothing to update'
            } else {
                const cartsFile = await this.getCarts();
                const idPosition = cartsFile.findIndex(cart => cart.id === cartId);
                if(idPosition > -1){
                    if(cart.products){cartsFile.products.push(cart.products)};                    
                    await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                    return 'OK';
                } else {
                    return 'Error';
                }
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    /* ------------------ elimina el carrito con el ID ingresado ------------------ */
    async deleteCarts(cartId){
        try {
            const cartsFile = await this.getCarts();
            const idPosition = cartsFile.findIndex(cart => cart.id === cartId);
            if(idPosition>-1){
                cartsFile.splice(idPosition,1);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return 'OK';
            } else {
                return 'Error';
            }
        }
        catch (error){
            console.log(error);
        }
    }
}