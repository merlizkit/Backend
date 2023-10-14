import { connect } from 'mongoose';
import config from '../../../config/config.js';
import { logger2 } from '../../../utils/logger.js';

export const connectionString = config.MONGO_ATLAS_URL

export const initMongoDB = async () => {
    try {
        await connect(connectionString);
        logger2.info('Conectado a la base de datos de MongoDB');
    } catch (error) {
        logger2.info(error.message);
    }
}