import express from 'express';
import { productService } from '../controllers/products.controllers.js';
import { ProductsModel } from '../DAO/models/product.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let { page, limit, query, sort } = req.query;
    sort = sort ? {price: sort} : null;
    
    const queryResult = await productService.getProducts(query, limit, page, sort);
    const { docs, ...rest } = queryResult;

    let products = docs;

    return res.status(200).render('home', {products, pagination: rest});
})



// router.get('/realTimeProducts', async (req, res) => {
//     const products = await productService.getProducts()
//     res.render('realTimeProducts', {products})
// })



export default router;