//@ts-check
import { Schema, model } from "mongoose";

const msgSchema = new Schema({
    email: { type: String, required: true, max: 100, unique: true },
    message: { type: String, required: true, max: 300 },
});

export const MsgsModel = model('messages', msgSchema);