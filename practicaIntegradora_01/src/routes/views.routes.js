import express from 'express';
import { productManager } from '../controllers/products.controllers.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', {products})
})


viewsRouter.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {products})
})



export default viewsRouter;