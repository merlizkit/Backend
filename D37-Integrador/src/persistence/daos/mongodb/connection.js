import { connect } from 'mongoose';
import { __dirname } from '../../../utils.js';
import { logger2 } from '../../../utils/logger.js';
import 'dotenv/config';

export const connectionString = process.env.MONGO_ATLAS_URL

try {
    await connect(connectionString);
    logger2.info('Conectado a la base de datos de MongoDB');
} catch (error) {
    logger2.info(error.message);
}