import { CartsDAO } from "../models/daos/app.daos.js";

const cartDAO = new CartsDAO()

export class CartService {

    async getCarts() {
        try {
            const carts = await cartDAO.getAll();
            return carts
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async saveCart() {
        try {
            let newCart = await cartDAO.createCart();
            return newCart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async getCartById( cid ) {
        try {
            let cart = await cartDAO.getById( cid );
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async addToCart( cid, pid ) {
        try {
            let res = await cartDAO.update( 
                { _id: cid, 'products.product': pid},
                { $inc: { 'products.$.quantity': 1 } },
                { new: true}
            );

            if(!res) {
                res = await cartDAO.update(
                    { _id: cid },
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            };

            return res;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async addQtyToCart( cid, pid, qty ) {
        try {
            const cart = await cartDAO( cid );
            const productInCart = cart.products.find((item) => item.product._id.toString() === pid);

            let res;
            if ((productInCart.quantity + qty) >= 1) {
                res = await cartDAO.update(
                    { _id: cid, 'products.product': pid},
                    { $inc: { 'products.$.quantity': +qty } },
                    { new: true}
                );
                return res;
            } 
            
            if ((productInCart.quantity + qty) === 0) {
                res = await cartDAO.update(
                    { _id: cid },
                    { $pull: { products: { product: pid } } },
                    { new: true }
                );
                return res;
            } else {
                return `I'm sorry, we can't subtract that amount, there are only ${productInCart.quantity} units of this products left in the cart`
            }
            
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async removeFromCart( cid, pid ) {
        try {
            let res = await cartDAO.update(
                    { _id: cid },
                    { $pull: { products: { product: pid } } },
                    { new: true }
            );

            return res;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async emptyCartById( cid ) {
        try {
            let cart = await cartDAO.update(
                { _id: cid },
                { products: [] },
                { new: true }
            );
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };


    async overwriteCartById( cid, prods ) {
        try {
            let cart = await cartDAO.update(
                { _id: cid },
                { products: prods },
                { new: true }
            );
            return cart;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };


}
