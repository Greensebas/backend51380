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
import { isCartOwner, isLogged, isNotAdmin } from '../middlewares/auth.js';



const router = express.Router()

router.post('/', saveCartController);
router.get('/:cid', getCartByIdController);
router.get('/:cid/purchase', isLogged, isNotAdmin, purchaseCartController);
router.put('/:cid', overwriteCartByIdController);
router.post('/:cid/product/:pid', isNotAdmin, isCartOwner, addToCartController);
router.put('/:cid/product/:pid', addQtyToCartController);
router.delete('/:cid/product/:pid', removeFromCartController);
router.delete('/:cid', emptyCartByIdController);



export default router;