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

// GET /api/carts/:cid
const getCartByIdController = async (req, res) => {
    try{
        let cid = req.params.cid
        let cart = await cartManager.getCartById(cid);
        return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart.products} )
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

// POST /api/carts/:cid/product/:pid 
const addToCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cartManager.addToCart(cid, pid);

        if(cart === 'CID error'){
            return res.status(400).json( {success: false, result: `Cart with id: '${cid}' not found`} )
        }

        return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart} );
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

// DELETE /api/carts/:cid/product/:pid 
const removeToCartController = async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cartManager.removeToCart(cid, pid);

        if(cart === 'CID error'){
            return res.status(400).json( {success: false, result: `Cart with id: '${cid}' not found CID`} )
        }

        if(cart === 'PID error'){
            return res.status(400).json( {success: false, result: `Product with id: '${pid}' not found`} )
        }

        return res.status(200).json( {success: true, result: cart} );
        // return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart} );
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
}

export {
    saveCartController,
    getCartByIdController,
    addToCartController,
    removeToCartController,
}