/* ------------------- este archivo usa el modulo de node ------------------- */

import ProductDaoMongoDB from '../../persistence/daos/mongodb/productDao.js';                  // importo la clase a testear
import assert from 'node:assert';
import test from 'node:test';
import mongoose from 'mongoose';
import config from '../../config/config.js';
import { logger2 } from './utils/logger.js';

describe('Tests unitarios de Dao Product', () => {                                          // agrupa tests
    let productDao;
    before(async() => {                                                                     // se ejecuta antes de todos los tests
        productDao = new ProductDaoMongoDB();
        await mongoose.connect(config.MONGO_ATLAS_URL_TEST)
        await mongoose.connection.collections['products'].drop();
        logger2.info('Conectado a la base de datos de MongoDB');
    })
    
    after(()=> {// se ejecuta despues de todos los tests
        logger2.info('Finalizaron las pruebas');
    });
    test('Debería devolver todos los productos de la colleccion products', async() => {       //este es el test, cada it es un test
        const products = await productDao.getAll();
        assert.equal(Array.isArray(products), true);
        assert.equal(products.length === 0, true);
    });                           
    test('Deberia crear un producto',  async() => {
        const prodBefore = await productDao.getAll();
        const doc = {
            title:"Mascarilla Para Piel Grasa", 
            code: "TEST1", 
            price: 500, 
            stock: 0, 
            category: "pterm", 
            status: true, 
            thumbnails: [], 
            description:"Mascarilla Para Piel Grasa"
        };
        const newProd = await productDao.create(doc);
        const product = await productDao.getAll();
        assert.ok(newProd, '_id');
        assert.equal(newProd.title, doc.title);
        assert.strictEqual(typeof doc.description === 'string', true);
        assert.strictEqual(product.length, 1)
    });
    test('Deberia encontrar un producto en una busqueda por id',  async() => {
        const doc = {
            title:"Mascarilla Para Piel Grasa", 
            code: "TEST2", 
            price: 500, 
            stock: 0, 
            category: "pterm", 
            status: true, 
            thumbnails: [], 
            description:"Mascarilla Para Piel Grasa"
        };
        const newProd = await productDao.create(doc);
        const docString = newProd._id.toString();
        const searchDoc = await productDao.getById(newProd._id);
        assert.equal(searchDoc._id.toString(), docString);
        assert.equal(typeof doc.title ===  'string', true);
    });
    test('Debería actualizar un producto',  async() => {
        const doc = {
            title:"Mascarilla Para Piel Grasa", 
            code: "TEST3", 
            price: 500, 
            stock: 0, 
            category: "pterm", 
            status: true, 
            thumbnails: [], 
            description:"Mascarilla Para Piel Grasa"
        };
        const doc2 = {
            title:"Mascarilla Para Piel Grasa-Modificada",
            price: 400
        };
        const newProd = await productDao.create(doc);
        const updDoc = await productDao.update(newProd._id, doc2);
        assert.equal(updDoc.title, doc2.title);
        assert.equal(updDoc.price, doc2.price);
    });
    test('Debería eliminar un producto',  async() => {
        const doc = {
            title:"Mascarilla Para Piel Grasa", 
            code: "TEST4", 
            price: 500, 
            stock: 0, 
            category: "pterm", 
            status: true, 
            thumbnails: [], 
            description:"Mascarilla Para Piel Grasa"
        };
        const newProd = await productDao.create(doc);
        const docDel = await productDao.remove(newProd.code);
        assert.equal(docDel.code, 'TEST4');
    });
    describe('', () => {});
})