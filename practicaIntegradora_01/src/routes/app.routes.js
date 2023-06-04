import express from 'express';
import productsRoutes from './products.routes.js';
import cartsRoutes from './carts.routes.js';
import viewsRoutes from './views.routes.js';
import chatRoutes from './chat.routes.js';



const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
// router.use('/views', viewsRoutes);
router.use('/chat', chatRoutes);




export default router