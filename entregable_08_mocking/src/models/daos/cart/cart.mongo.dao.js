import { CartSchema } from "../../schemas/cart.schema.js";

class CartMongoDAO {

    async getAll() {
        try {
            const carts = await CartSchema.find({});
            return carts;
        }
        catch (error) {
            console.log(error)
        }
    };
    
    async getById( cid ) {
        try {
            let cart = await CartSchema.findOne({ _id: cid });
            return cart;
        }
        catch (error) {
            console.log(error)
        }
    };

    async createCart() {
        try {
            let newCart = await CartSchema.create({});
            return newCart;
        }
        catch (error) {
            console.log(error)
        }
    };

    async update() {
        try {
            let res = await CartSchema.findOneAndUpdate();

            return res;
        }
        catch (error) {
            console.log(error)
        }
    };

}

export {CartMongoDAO}