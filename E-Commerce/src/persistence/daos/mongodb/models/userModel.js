import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cartId: { type: Schema.Types.ObjectId, ref: 'carts' },
    role: { type: String, default: 'user' },
    documents: [
        { 
            name: { type: String },
            reference: { type: String }
        }
    ],
    status: { type: Boolean, default: false },
    last_connection: { type: Date }
});

export const UserModel = model('users', userSchema);