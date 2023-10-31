import ProductDaoMongoDB from '../persistence/daos/mongodb/productDao.js';                  // importo la clase a testear
import { expect, assert } from 'chai';
import mongoose from 'mongoose';
import config from '../config/config.js';

describe('Tests unitarios de Dao Product', () => {                                          // agrupa tests
    let productDao;
    before(async() => {                                                                     // se ejecuta antes de todos los tests
        productDao = new ProductDaoMongoDB();
        await mongoose.connect(config.MONGO_ATLAS_URL_TEST)
        await mongoose.connection.collections['products'].drop();
        console.log('Conectado a la base de datos de MongoDB');
    })
    //after                                                                                 // se ejecuta despues de todos los tests
    it('Debería devolver todos los productos de la colleccion products', async() => {       //este es el test, cada it es un test
        const products = await productDao.getAll();
        expect(Array.isArray(products)).to.be.equal(true);                                  // que espero que pase
        //expect(products).to.have.length(0);                                                 // si hubiera borrado la base para probar
        //assert.lengthOf(products, 0);                                                     // igual que el expect, pero escrito diferente, se puede usar cualquiera
    });                           
    it('Deberia crear un producto',  async() => {
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
        expect(product.length).to.be.equal(prodBefore.length +1);
        expect(newProd.code).to.have.contains('TEST1');
    });
    it('Deberia encontrar un producto en una busqueda por id',  async() => {
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
        expect(searchDoc._id.toString()).to.equal(docString);
        expect(typeof doc.title ===  'string').to.be.equal(true);
    });
    it('Debería actualizar un producto',  async() => {
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
        expect(updDoc.title).to.be.equal(doc2.title);
        expect(updDoc.price).to.be.equal(doc2.price);
    });
    it('Debería eliminar un producto',  async() => {
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
        expect(docDel.code).to.be.equal('TEST4');
    });
    describe('', () => {});
})