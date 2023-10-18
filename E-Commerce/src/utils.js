import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import MongoStore from 'connect-mongo';
import { connectionString } from './persistence/daos/mongodb/connection.js';
import { fakerES_MX as faker } from '@faker-js/faker';
import config from './config/config.js';
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ----------------------------- connection data ---------------------------- */;
export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: config.SECRET_MONGO
        }
    }),
    secret: config.SECRET_MONGO,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
};

/* --------------------------- password encryption -------------------------- */
export const createHash = password => hashSync(password, genSaltSync(10));
export const isValidPassword = (password, user) => compareSync(password, user.password);

/* ---------------------------- response handler ---------------------------- */
export const createResponse = (res, statusCode, data) => { return res.status(statusCode).json({data}); };

/* ------------------------- fake product generation ------------------------ */
export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: '02'+faker.string.numeric(5),
        price: faker.commerce.price(),
        stock: faker.string.numeric(2),
        category: 'pterm',
        status: faker.number.int(1) === 1 ? 'true' : 'false',
        thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
    }
}