import { CartManager } from "../services/CartManager.js";

const cartManager = new CartManager('./db/carts.json');

// POST /api/carts
const saveCartController = async (req, res) => {
    try{
        let classResponse = await cartManager.saveCart();
        return res.status(200).json( {success: true, result: classResponse} )
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

const getCartByIdController = async (req, res) => {
    try{
        let classResponse = await g
        return res.status(200).json( {success: true, result: classResponse} );
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

export {
    saveCartController,
    getCartByIdController
}