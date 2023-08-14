import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import MongoStore from 'connect-mongo';
import { connectionString } from './config/connection.js';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

export const createHash = password => hashSync(password, genSaltSync(10));
export const isValidPassword = (password, user) => compareSync(password, user.password);