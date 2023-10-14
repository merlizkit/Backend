import { Sequelize } from 'sequelize';

export const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export const initMySqlDB = async() =>{
    try {
        await db.sync({ force: false });
        logger2.info('Conectado a la base de datos de MYSQL');
    } catch (error) {
        logger2.info(error.message);
    }
};