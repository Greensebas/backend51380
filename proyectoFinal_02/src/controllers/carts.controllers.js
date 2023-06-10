import { CartService } from "../services/cart.service.js";

const cartService = new CartService

// POST /api/carts
const saveCartController = async (req, res) => {
    try{
        let classResponse = await cartService.saveCart();
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
        let cart = await cartService.getCartById(cid);
        return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart.products} )
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

// POST /api/carts/:cid/product/:pid 
const addToCartController = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    try {
        let cart = await cartService.addToCart(cid, pid);

        return res.status(200).json( {success: true, result: cart} );
    }
    catch(error) {
        if(error.message === 'CID error'){
            return res.status(400).json( {success: false, result: `Cart with id: '${cid}' not found`} )
        }

        res.status(500).json({ success: false, result: error.message });
    }
};


// PUT /api/carts/:cid/product/:pid 
const addQtyToCartController = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let qty = req.body.quantity;

    try {
        let cart = await cartService.addQtyToCart(cid, pid, qty);

        return res.status(200).json( {success: true, result: cart} );
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

// DELETE /api/carts/:cid/product/:pid 
const removeFromCartController = async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    try {
        let cart = await cartService.removeFromCart(cid, pid);

        return res.status(200).json( {success: true, result: cart} );
    }
    catch(error) {
        if(error.message === 'CID error'){
            return res.status(400).json( {success: false, result: `Cart with id: '${cid}' not found CID`} )
        }

        if(error.message === 'PID error'){
            return res.status(404).json( {success: false, result: `Product with id: '${pid}' not found`} )
        }

        res.status(500).json({ success: false, result: error.message });
    }
};

// DELETE /api/carts/:cid
const emptyCartByIdController = async (req, res) => {
    try{
        let cid = req.params.cid
        let cart = await cartService.emptyCartById(cid);
        return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart.products} )
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};


// DELETE /api/carts/:cid
const overwriteCartByIdController = async (req, res) => {
    try{
        let cid = req.params.cid
        let prods = req.body
        let cart = await cartService.overwriteCartById(cid, prods);
        return (!cart) ? res.status(404).json({ success: false, result: `Cart with id ${cid} do not exists`}) : res.status(200).json( {success: true, result: cart.products} )
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

export {
    saveCartController,
    getCartByIdController,
    addToCartController,
    removeFromCartController,
    emptyCartByIdController,
    addQtyToCartController,
    overwriteCartByIdController,
}