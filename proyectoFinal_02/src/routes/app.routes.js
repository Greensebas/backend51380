import express from 'express';
import productsRoutes from './products.routes.js';
import cartsRoutes from './carts.routes.js';
import viewsRoutes from './views.routes.js';
import chatRoutes from './chat.routes.js';



const router = express.Router();

router.use('/api/products', productsRoutes);
router.use('/api/carts', cartsRoutes);
router.use('/views/products', viewsRoutes);
router.use('/chat', chatRoutes);




export default router