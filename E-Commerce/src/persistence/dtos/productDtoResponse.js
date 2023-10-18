export default class ProductDTOResponse {
    constructor(product) {
        // solo quiero mandar al front el titulo y el precio y en español
        this.nombre = product.product_title;
        this.precio = product.product_price;
    };
};