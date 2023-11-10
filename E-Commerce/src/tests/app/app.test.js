import app from '../../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { fakerES as faker } from '@faker-js/faker';

describe('Tests integrales Api Products', () => {
    // beforeAll(async () => {
    //     mongoose.connection.useDb('ecommerce-test')
    //     await mongoose.connection.collections['products'].drop(); 
    // });

    // test('Register', async () => {
    //     const doc = {
    //             first_name: "Matias",
    //             last_nam: "Merlo",
    //             email: "merlizkit@gmail.com",
    //             age: 38,
    //             password: "123456"
    //     };
    //     const response = await request(app).post('/api/users/register').send(doc);
    //     const id = response.body._id;
    //     const emailResponse = response.body.email;
    //     expect(id).toBeDefined();                                          // verifico que el id esté llegando
    //     expect(response.body).toHaveProperty('_id');
    //     expect(emailResponse).toBe(doc.title);
    // }, 30000);

    test('Login', async () => {
        const doc = {
            email: 'merlizkit@gmail.com',
            password: '12345'
        };
        const response = await request(app).post('/api/users/login').send(doc);
        console.log(response);
        const id = response.body._id;
        const emailResponse = response.body.title;
        expect(id).toBeDefined();                                          // verifico que el id esté llegando
        expect(response.body).toHaveProperty('_id');
        expect(emailResponse).toBe(doc.title);
    }, 30000);

    // test('Create New', async () => {
    //     const doc = {
    //         title: faker.commerce.productName(),
    //         description: faker.commerce.productDescription(),
    //         code: '02'+faker.string.numeric(5),
    //         price: faker.commerce.price(),
    //         stock: faker.string.numeric(2),
    //         category: 'pterm',
    //         status: faker.number.int(1) === 1 ? 'true' : 'false',
    //         thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
    //     };
    //     const response = await request(app).post('/api/product').send(doc);
    //     console.log(response);
        // const id = response._body._id;
        // const titleResponse = response._body.title;
        // expect(id).toBeDefined();                                          // verifico que el id esté llegando
        // expect(response._body).toHaveProperty('_id');
        // expect(titleResponse).toBe(doc.title);
    // });

    // test('[GET-ALL] /api/products', async() => {
    //     const response = await request(app).get('/api/products');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toBeInstanceOf(Array);                       // verifica que sea array con objetos dentro
    //     expect(response.body).toHaveLength(1);
    // })

    // test('[GET-ID] /api/products/:pid', async() => {
    //     const doc = {
    //         title: faker.commerce.productName(),
    //         description: faker.commerce.productDescription(),
    //         code: '02'+faker.string.numeric(5),
    //         price: faker.commerce.price(),
    //         stock: faker.string.numeric(2),
    //         category: 'pterm',
    //         status: faker.number.int(1) === 1 ? 'true' : 'false',
    //         thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
    //     };
    //     const response = await request(app).post('/api/product').send(doc);
    //     const titleResponse = response.body.title;
    //     expect(response.statusCode).toBe(200);
    //     const id = response.body._id;
    //     expect(id).toBeDefined();                
    //     expect(response.body).toHaveProperty('_id');
    //     const responseGetById = await request(app).get(`/api/products/${id}`);
    //     expect(responseGetById.statusCode).toBe(200);
    //     expect(titleResponse).toBe(responseGetById.body.title);
    //     const idFail = 'werwerwer';
    //     const GetByIdFail = await request(app).get(`/api/products/${idFail}`);
    //     const responseGetFail = GetByIdFail.body.msg;
    //     const msgErrorApi = 'Product not found'
    //     expect(GetByIdFail.statusCode).toBe(404);
    //     expect(responseGetFail).toEqual(msgErrorApi);
    // })

    // test('[PUT] /api/products/:pid', async() => {
    //     const doc = {
    //         title: faker.commerce.productName(),
    //         description: faker.commerce.productDescription(),
    //         code: '02'+faker.string.numeric(5),
    //         price: faker.commerce.price(),
    //         stock: faker.string.numeric(2),
    //         category: 'pterm',
    //         status: faker.number.int(1) === 1 ? 'true' : 'false',
    //         thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
    //     };
    //     const docUpd = {
    //         title:"Mascarilla Para Piel Grasa-Modificada",
    //         price: 400
    //     };
    //     const responsePost = await request(app).post('/api/product').send(doc);
    //     const idPost = responsePost.body._id;
    //     expect(idPost).toBeDefined();
    //     const responsePut = await request(app).put(`/api/products/${idPut}`).send(docUpd);
    //     const idPut = response.body._id;
    //     expect(idPut).toBeDefined();
    //     expect(responsePut.statusCode).toBe(200);
    // });

    // test('[DELETE] /api/products/:pid', async() => {
    //     const doc = {
    //         title: faker.commerce.productName(),
    //         description: faker.commerce.productDescription(),
    //         code: '02'+faker.string.numeric(5),
    //         price: faker.commerce.price(),
    //         stock: faker.string.numeric(2),
    //         category: 'pterm',
    //         status: faker.number.int(1) === 1 ? 'true' : 'false',
    //         thumbnails: faker.image.urlLoremFlickr({ category: 'business' })
    //     };
    //     const responsePost = await request(app).post('/api/product').send(doc);
    //     const idPost = responsePost.body._id;
    //     expect(idPost).toBeDefined();
    //     const responseDel = await request(app).delete(`/api/products/${idPost}`);
    //     expect(responseDel.statusCode).toBe(200);
    //     const GetByIdFail = await request(app).get(`/api/products/${response.body._id}`)
    //     const responseGetFail = GetByIdFail.body.msg;
    //     const msgErrorApi = 'Product not found'
    //     expect(GetByIdFail.statusCode).toBe(404);
    //     expect(responseGetFail).toEqual(msgErrorApi);
    // });

})