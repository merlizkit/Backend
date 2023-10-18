export default class ProductDTORegister {
    constructor(product) {
        this.product_title = product.title;
        this.product_description = product.description;
        this.product_price = product.price;
        this.product_stock = product.stock;
    };

}