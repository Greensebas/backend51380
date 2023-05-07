import express from 'express';
import {
    saveCartController,
    getCartByIdController,
    addToCartController,
} from '../controllers/carts.controllers.js';



const router = express.Router()

router.post('/', saveCartController);
router.get('/:cid', getCartByIdController);
router.post('/:cid/product/:pid', addToCartController);



export default router;