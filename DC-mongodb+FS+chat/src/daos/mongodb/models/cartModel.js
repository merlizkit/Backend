import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    prodId: { type: mongoose.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true },
})
const cartSchema = new mongoose.Schema({
    products: { type: [prodSchema], required: true },
});

export const CartModel = mongoose.model('carts', cartSchema);