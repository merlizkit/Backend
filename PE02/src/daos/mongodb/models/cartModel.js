import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            prodId: {
                type: mongoose.Schema.Types.ObjectId
                , ref: 'products', required: true },
            quantity: { type: Number, required: true }
        }
    ],
});

cartSchema.pre('find', function(){
    this.populate('products');
})

export const CartModel = mongoose.model('carts', cartSchema);