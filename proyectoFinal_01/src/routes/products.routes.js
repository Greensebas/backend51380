import express from 'express';
import {
    getProductsController, 
    getProductByIdController, 
    addProductController, 
    deleteProductByIdController, 
    updateProductController,
} from '../controllers/products.controllers.js';


const router = express.Router();

// Routes
    router.get( '/', getProductsController );
    router.get('/:pid', getProductByIdController);
    router.post('/', addProductController);
    router.delete('/:pid', deleteProductByIdController);
    router.put('/:pid', updateProductController);


export default router;