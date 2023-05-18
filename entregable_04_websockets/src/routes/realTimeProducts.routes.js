import express from 'express';
import { productManager } from '../controllers/products.controllers.js';

const realTimeProductsRoutes = express.Router();

realTimeProductsRoutes.get('/', async (res, req) => {
    try{
        const products = await productManager.getProducts();
        // console.log(products);
        return res.render("realTimeProducts", { products: products });
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
        // console.log(error)
    }
})

export default realTimeProductsRoutes;