import express from 'express';
import { productService } from '../controllers/products.controllers.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productService .getProducts()
    res.render('home', {products})
})


router.get('/realTimeProducts', async (req, res) => {
    const products = await productService.getProducts()
    res.render('realTimeProducts', {products})
})



export default router;