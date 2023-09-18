import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import MongoStore from 'connect-mongo';
import { connectionString } from './persistence/daos/mongodb/connection.js';


export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: process.env.SECRET_MONGO
        }
    }),
    secret: process.env.SECRET_MONGO,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

export const createHash = password => hashSync(password, genSaltSync(10));
export const isValidPassword = (password, user) => compareSync(password, user.password);

export const createResponse = (res, statusCode, data) => { return res.status(statusCode).json({data}); };