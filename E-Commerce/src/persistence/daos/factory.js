import ProductDaoFS from "./filesystem/productDao.js";
import UserDaoFS from "./filesystem/userDao.js";
import MessagesDaoFS from "./filesystem/messagesDao.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMongo from "./mongodb/productDao.js";
import UserDaoMongo from "./mongodb/userDao.js";
import MessagesDaoMongo from "./mongodb/messagesDao.js";
import { initMongoDB } from "./mongodb/connection.js";
/* ------------------------------------ - ----------------------------------- */
import ProductDaoMySql from "./mysql/productDao.js";
import UserDaoMySql from "./mysql/userDao.js";
import { initMySqlDB } from "./mysql/connection.js";

import { logger2 } from "../../utils/logger.js";
import config from '../../config/config.js';

let userDao;
let prodDao;
let messagesDao;
let persistence = config.PERSISTENCE;

switch (persistence) {
  case "file":
    userDao = new UserDaoFS();
    prodDao = new ProductDaoFS();
    messagesDao = new MessagesDaoFS();
    logger2.info(persistence);
    break;
  case "mongo":
    await initMongoDB();
    userDao = new UserDaoMongo();
    prodDao = new ProductDaoMongo();
    messagesDao = new MessagesDaoMongo();
    break;
  case "mysql":
    await initMySqlDB();
    userDao = new UserDaoMySql();
    prodDao = new ProductDaoMySql();
    break;
  default:
    userDao = new UserDaoFS();
    prodDao = new ProductDaoFS();
    messagesDao = new MessagesDaoMongo();
    persistence = "file";
    logger2.info(persistence);
    break;
}

export default { prodDao, userDao, messagesDao };