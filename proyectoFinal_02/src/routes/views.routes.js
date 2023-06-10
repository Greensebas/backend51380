import express from 'express';
import { productService } from '../controllers/products.controllers.js';
import { ProductsModel } from '../DAO/models/product.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const currentUrl = req.originalUrl
        let { page, limit, query, sort } = req.query;
        sort = sort ? {price: sort} : null;
        query = query ? {category: {$in: [query] }, stock: { $gt: 0} } : null

        const queryResult = await productService.getProducts(query, limit, page, sort, currentUrl)

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