import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://merlizkit:bZUv7mHw1x3xDcot@cluster0.rfy1ojm.mongodb.net/ecommerce?retryWrites=true&w=majority'

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(error);
}