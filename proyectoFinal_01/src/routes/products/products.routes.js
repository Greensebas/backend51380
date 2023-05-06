import express from 'express';
import {
    getProductsController, 
    getProductByIdController, 
    addProductController, 
    deleteProductByIdController, 
    updatedProductController
} from '../../controllers/products.controllers.js';

// import {
//     getProductController,
//     getProductByIdController,
//     addProductController,
//     deleteProductByIdController,
//     updatedProductController,
// } from '../../controllers/products.controllers.js'

const router = express.Router();

// Routes
    //GET
    router.get( '/', getProductsController );



export default router;