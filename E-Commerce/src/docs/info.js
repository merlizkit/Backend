export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API E-Commerce',
            version: '1.0.0',
            description: 'API para agregar un carro de compras y el CRUD de productos'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/docs/aria*.yml']
};