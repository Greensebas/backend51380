import express from 'express';
import {
    getProductsController, 
    getProductByIdController, 
    addProductController, 
    deleteProductByIdController, 
    updateProductController,
    urlNotFoundController
} from '../controllers/products.controllers.js';


const router = express.Router();

// Routes
    router.get( '/', getProductsController );
    router.get('/:pid', getProductByIdController);
    router.post('/', addProductController);
    router.delete('/:pid', deleteProductByIdController);
    router.put('/:pid', updateProductController);
    // No sé cómo utilizar este urlNotFoundController aunque de todos modos no se solicita
    router.use('*', urlNotFoundController);


export default router;