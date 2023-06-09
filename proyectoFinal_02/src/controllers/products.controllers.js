import { ProductService } from "../services/product.service.js";

const productService = new ProductService;

// GET /api/products
const getProductsController = async (req, res) => {
    try {
        let limit = +req.query.limit;
        const allProducts = await productService.getProducts();
        let nProducts = allProducts.slice(0, limit);
    
        return (!limit) ? res.status(200).json({ success: true, result: allProducts }) : res.status(200).json({ success: true, result: nProducts })
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
};

// GET /api/products/pid
const getProductByIdController = async (req, res) => {
    try {
        let pid = req.params.pid;
        let product = await productService.getProductById(pid);

        return (!product) ? res.status(404).json(`product with id ${pid} do not exists`) : res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
};

// POST /api/products
const addProductController = async (req, res) => {
    try {
        let prod = req.body;
        let classResponse = await productService.addProduct(prod);

        if(classResponse === 'Body format error'){
            return res.status(400).json( {success: false, result: `Wrong body format. The product must be contain 'title', 'description', 'price', 'status', 'category', 'code' and 'stock`});
        };

        if(classResponse === 'Code error'){
            return res.status(400).json( {success: false, result: `This code (${prod.code}) already exists`} )
        }

        return res.status(200).json( {success: true, result: classResponse} )

    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
};

// DELETE /api/products/:pid
const deleteProductByIdController = async (req, res) => {
    try {
        let pid = req.params.pid;
        let deletedProduct = await productService.deleteProductById(pid);

        return (!deletedProduct) ? res.status(404).json({success: false, result: `product with id ${pid} do not exists`}) : res.status(200).json( {success: true, result: deletedProduct} )
    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
};

// PUT /api/products/pid
const updateProductController = async (req, res) => {
    try {
        let prod = req.body;
        let pid = req.params.pid;
        let updatedProduct = await productService.updateProduct(pid, prod);

        if(updatedProduct === 'ID error'){
            return res.status(400).json( {success: false, result: `Product with id: '${pid}' not found`} )
        }

        if(updatedProduct === 'Body format error'){
            return res.status(400).json( {success: false, result: `Wrong body format. The product must be contain 'title', 'description', 'price', 'thumbnail', 'code' and 'stock`});
        };

        return res.status(200).json( {success: true, result: updatedProduct} )
        
    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
};


export {
    getProductsController,
    getProductByIdController,
    addProductController,
    deleteProductByIdController,
    updateProductController,
    productService,
}