import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, enum:['pterm','selab','mprim','insum'] },
    status: { type: Boolean, default: true , required: true },
    thumbnails: { type: Array, default: [] }
});

productSchema.index({category: 1, code: 1, title: 1});
productSchema.plugin(mongoosePaginate);
export const ProductModel = mongoose.model('products', productSchema);