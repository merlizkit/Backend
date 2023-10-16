import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    products: [
        {
            prodId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'products', required: true
            },
            quantity: { type: Number, required: true },
            _id: false
        }
    ],
});

export const CartModel = mongoose.model('carts', cartSchema);