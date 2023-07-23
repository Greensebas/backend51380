import express from 'express';
import { 
    getCartByIdRenderController,
    getLoginGithubRenderController, 
    getProductsRenderController, 
    getUserRenderController 
} from '../controllers/views.controllers.js';

const router = express.Router();

router.get('/', getUserRenderController);
router.get('/login-github', getLoginGithubRenderController);
router.get('/products', getProductsRenderController);
router.get('/cart/:cid', getCartByIdRenderController);


export default router;