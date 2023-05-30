import express from 'express';
import {
    saveCartController,
    getCartByIdController,
    addToCartController,
    removeToCartController,
} from '../controllers/carts.controllers.js';



const router = express.Router()

router.post('/', saveCartController);
router.get('/:cid', getCartByIdController);
router.post('/:cid/product/:pid', addToCartController);
router.delete('/:cid/product/:pid', removeToCartController);



export default router;