import factory from "../daos/factory.js";
import ProductDTORegister from "../dtos/productDtoRegister.js";
import ProductDTOResponse from "../dtos/productDtoResponse.js";
const { productDao } = factory;

export default class ProductRepository {
    constructor() {
        this.dao = productDao;
    }

    async createProd(prod) {
        try {
            const prodDTO = new ProductDTORegister(prod);
            return await this.dao.create(prodDTO);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProdById(id) {
        try {
            const prod = await this.dao.getById(id);
            return new ProductDTOResponse(prod);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
