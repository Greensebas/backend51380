import express from 'express';
import { productManager } from '../controllers/products.controllers.js';

const handlebarsRoutes = express.Router();

handlebarsRoutes.get('/', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        return res.render('home', {products: products});
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
})

export default handlebarsRoutes;