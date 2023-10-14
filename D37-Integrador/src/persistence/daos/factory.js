import ProductDaoFS from "./filesystem/productDao.js";
import UserDaoFS from "./filesystem/userDao.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMongo from "./mongodb/productDao.js";
import UserDaoMongo from "./mongodb/userDao.js";
import { initMongoDB } from "./mongodb/connection.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMySql from "./mysql/productDao.js";
import UserDaoMySql from "./mysql/userDao.js";
import { initMySqlDB } from "./mysql/connection.js";

import { logger2 } from "../../utils/logger.js";

let userDao;
let prodDao;
let persistence = process.env.PERSISTENCE;

switch (persistence) {
  case "file":
    userDao = new UserDaoFS();
    prodDao = new ProductDaoFS();
    logger2.info(persistence);
    break;
  case "mongo":
    await initMongoDB();
    userDao = new UserDaoMongo();
    prodDao = new ProductDaoMongo();
    break;
  case "mysql":
    await initMySqlDB();
    userDao = new UserDaoMySql();
    prodDao = new ProductDaoMySql();
    break;
  default:
    userDao = new UserDaoFS();
    prodDao = new ProductDaoFS();
    persistence = "file";
    logger2.info(persistence);
    break;
}

export default { prodDao, userDao };