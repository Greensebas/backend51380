import { Schema, model } from 'mongoose';


const ticketSchema = new Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, default: Date.now(), required: true },
    purchaser: { type: String, required: true, default: '' },
    products: [
        {
            id: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, required: true, default: 0 },
            _id: false,
        },
    ],
});

ticketSchema.pre('find', function () {
    this.populate('products.id');
});

ticketSchema.pre('findOne', function () {
    this.populate('products.id');
});


export const TicketSchema = model('tickets', ticketSchema);