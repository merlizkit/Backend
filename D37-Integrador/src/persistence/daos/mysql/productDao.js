import MySQLDao from "./mysqlDao.js";
import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMySql extends MySQLDao {
    constructor(){
        super(ProductModel)
    }
};

