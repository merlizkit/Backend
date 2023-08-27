import mongoose from 'mongoose';

const connectionString = ''

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
    console.log(error);
}
