
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
    };

    async saveCart() {
        try {
            let newCart = await CartModel.create({});
            return newCart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async getCartById( id ) {
        try {
            let cart = await CartModel.findOne({ _id: id });
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async addToCart( cid, pid ) {
        try {
            let res = await CartModel.findOneAndUpdate(
                { _id: cid, 'products.product': pid},
                { $inc: { 'products.$.quantity': 1 } },
                { new: true}
            );
            
            if(!res) {
                res = await CartModel.findOneAndUpdate(
                    { _id: cid },
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            }

            return res;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async removeToCart( cid, pid ) {
        try {
            let cart = await CartModel.findOne({ _id: cid, 'products.product': pid},);
            let productObj = cart.products.find((item) => item.product.equals(pid));

            let res;

            if(productObj.quantity === 1) {
                res = await CartModel.findOneAndUpdate(
                    { _id: cid },
                    { $pull: { products: { product: pid } } },
                    { new: true }
                );
            } else {
                res = await CartModel.findOneAndUpdate(
                { _id: cid, 'products.product': pid},
                { $inc: { 'products.$.quantity': -1 } },
                { new: true}
            );
            }

            return res;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };


}
