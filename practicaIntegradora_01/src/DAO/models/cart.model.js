//@ts-check
import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                default: 0,
            },
        },
    ],
});


// Esto es el pre-populate
cartSchema.pre('findOne', function() {
    this.populate('products.product');
});

cartSchema.pre('find', function() {
    this.populate('products.product');
});

export const CartModel = model('cart', cartSchema);
