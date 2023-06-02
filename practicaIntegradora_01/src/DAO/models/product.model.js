//@ts-check
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true, },
  category: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true},
  thumbnail: { type: [String], required: false },
});

export const ProductsModel = model('products', productSchema);
