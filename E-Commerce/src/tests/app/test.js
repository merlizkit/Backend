/* ------------------- este archivo usa el modulo de node ------------------- */

import app from '../../server.js';
import { describe, test } from 'node:test';
import assert from 'node:assert';
import { fakerES as faker } from '@faker-js/faker';

const apiURL = `${config.URL}:${config.PORT}/api/products`;

describe('Test /api/product', () => {

    test('[POST] /api/products', async () => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: '02'+faker.string.numeric(5),
            price: faker.commerce.price(),
            stock: faker.string.numeric(2),
            category: 'pterm',
            status: faker.number.int(1) === 1 ? 'true' : 'false',
            thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
        };
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(doc)
        });
        const responseApi = await response.json();
        const id = responseApi._id;
        assert.ok(responseApi).toHaveProperty('_id');
        assert.equal(typeof id, 'string');
        assert.equal(response.status, 200);
    });

    test('[GET-ALL] /api/products', async() => {
        const response = fetch(apiURL);
        const responseApi = await response.json();
        assert.strictEqual(Array.isArray(responseApi), true);
        assert.equal(responseApi.length === 0, true);
    })

    test('[GET-ID] /api/products/:pid', async() => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: '02'+faker.string.numeric(5),
            price: faker.commerce.price(),
            stock: faker.string.numeric(2),
            category: 'pterm',
            status: faker.number.int(1) === 1 ? 'true' : 'false',
            thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
        };
        const response = await request(app).post('/api/product').send(doc);
        const titleResponse = response.body.title;
        expect(response.statusCode).toBe(200);
        const id = response.body._id;
        expect(id).toBeDefined();                
        expect(response.body).toHaveProperty('_id');
        const responseGetById = await request(app).get(`/api/products/${id}`);
        expect(responseGetById.statusCode).toBe(200);
        expect(titleResponse).toBe(responseGetById.body.title);
        const idFail = 'werwerwer';
        const GetByIdFail = await request(app).get(`/api/products/${idFail}`);
        const responseGetFail = GetByIdFail.body.msg;
        const msgErrorApi = 'Product not found'
        expect(GetByIdFail.statusCode).toBe(404);
        expect(responseGetFail).toEqual(msgErrorApi);
    })

    test('[PUT] /api/products/:pid', async() => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: '02'+faker.string.numeric(5),
            price: faker.commerce.price(),
            stock: faker.string.numeric(2),
            category: 'pterm',
            status: faker.number.int(1) === 1 ? 'true' : 'false',
            thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
        };
        const docUpd = {
            title:"Mascarilla Para Piel Grasa-Modificada",
            price: 400
        };
        const responsePost = await request(app).post('/api/product').send(doc);
        const idPost = response.body._id;
        expect(idPost).toBeDefined();
        const responsePut = await request(app).put(`/api/products/${idPut}`).send(docUpd);
        const idPut = response.body._id;
        expect(idPut).toBeDefined();
        expect(responsePut.statusCode).toBe(200);
    });

    test('[DELETE] /api/products/:pid', async() => {
        const doc = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: '02'+faker.string.numeric(5),
            price: faker.commerce.price(),
            stock: faker.string.numeric(2),
            category: 'pterm',
            status: faker.number.int(1) === 1 ? 'true' : 'false',
            thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
        };
        const responsePost = await request(app).post('/api/product').send(doc);
        const idPost = response.body._id;
        expect(idPost).toBeDefined();
        const responseDel = await request(app).delete(`/api/products/${idPost}`);
        expect(responseDel.statusCode).toBe(200);
        const GetByIdFail = await request(app).get(`/api/products/${response.body._id}`)
        const responseGetFail = GetByIdFail.body.msg;
        const msgErrorApi = 'Product not found'
        expect(GetByIdFail.statusCode).toBe(404);
        expect(responseGetFail).toEqual(msgErrorApi);
    });

})