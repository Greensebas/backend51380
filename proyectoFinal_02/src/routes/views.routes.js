import express from 'express';
import { productService } from '../controllers/products.controllers.js';
import { ProductsModel } from '../DAO/models/product.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currentUrl = req.originalUrl
        let { page, limit, sort, category, stock } = req.query;
        sort = sort ? {price: sort} : null;
        let query = {}
        category ? query.category = category : null;
        stock ? query.stock = { $gt: +stock} : null;

        const queryResult = await productService.getProducts(query, limit, page, sort, currentUrl)

        console.log(queryResult.pagination);
        
        return res.status(200).render('home', {
            success: true, 
            products: queryResult.products,
            pagination: queryResult.pagination,
        });
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
})



// router.get('/realTimeProducts', async (req, res) => {
//     const products = await productService.getProducts()
//     res.render('realTimeProducts', {products})
// })



export default router;