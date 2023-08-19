import express from 'express';
import {
    saveCartController,
    getCartByIdController,
    addToCartController,
    removeFromCartController,
    emptyCartByIdController,
    addQtyToCartController,
    overwriteCartByIdController,
    purchaseCartController,
} from '../controllers/carts.controllers.js';



const router = express.Router()

router.post('/', saveCartController);
router.get('/:cid', getCartByIdController);
router.get('/:cid/purchase', purchaseCartController);
router.put('/:cid', overwriteCartByIdController);
router.post('/:cid/product/:pid', addToCartController);
router.put('/:cid/product/:pid', addQtyToCartController);
router.delete('/:cid/product/:pid', removeFromCartController);
router.delete('/:cid', emptyCartByIdController);



export default router;