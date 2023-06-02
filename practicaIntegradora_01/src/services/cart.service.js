
import { CartModel } from "../DAO/models/cart.model.js";

export class CartService {

    async getCarts() {
        try {
            const carts = await CartModel.find({});
            return carts
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async saveCart() {
        try {
            let newCart = await CartModel.create({});
            return newCart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async getCartById( id ) {
        try {
            let cart = await CartModel.findOne({ _id: id });
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async addToCart( cid, pid ) {
        try {
            let cart = await CartModel.findOne({ _id: cid });
            cart.products.push({ product: pid});
            let res = await CartModel.updateOne({ _id: cid }, cart, { new: true });
            return res;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async removeToCart( cid, pid ) {

    }


}
