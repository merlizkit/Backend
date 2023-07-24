import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    prodId: mongoose.ObjectId,
    quantity: { type: Number, required: true },
})
const cartSchema = new mongoose.Schema({
    products: [prodSchema],
});

export const CartModel = mongoose.model('carts', cartSchema);