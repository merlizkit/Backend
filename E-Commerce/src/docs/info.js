export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API E-Commerce',
            version: '1.0.0',
            description: `API para agregar un carro de compras y el CRUD de productos.<br>
            <br>
            Abajo está la lista de todos los endpoints disponibles para los productos y carritos.<br>
            <br>
            Antes de hacer las pruebas, loguearse desde el enpoint de users/login:<br>
            Usuario comun: <br>
                - email: user@gmail.com<br>
                - password: 12345<br>
            <br>
            Usuario premium: <br>
                - email: premium@gmail.com<br>
                - password: 12345`
        },
        servers: [
            {
                url: config.URL
            }
        ]
    },
    apis: ['./src/docs/*.yml']
};