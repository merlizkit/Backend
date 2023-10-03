import { connect } from 'mongoose';
import 'dotenv/config';

export const connectionString = process.env.MONGO_ATLAS_URL

try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    req.logger.error(error.message);
}