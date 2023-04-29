const express = require('express');
const ProductManager = require('./ProductManager.js');

const PORT = process.env.PORT || 8080;
const app = express();

const conectedServer = app.listen(PORT, () => {
    console.log(`🚀Server is up and running on port: ${PORT}🚀`);
})

const productManager = new ProductManager('./db/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET
app.get('/api/products', async (req, res) => {
    try {
        let limit = req.query.limit;
        const allProducts = await productManager.getProducts();
        let nProducts = allProducts.slice(0, +limit);
    
        return (!limit) ? res.status(200).json({ success: true, result: allProducts }) : res.status(200).json({ success: true, result: nProducts })
    }
    catch(error) {
        res.status(500).json({ success: false, result: error.message });
    }
});


//GET BY ID
app.get('/api/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        let product = await productManager.getProductById(+pid)

        return (!product) ? res.status(404).json(`product with id ${pid} do not exists`) : res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
});


// POST
app.post('/api/products', async (req, res) => {
    try {
        let prod = req.body;
        let classResponse = await productManager.addProduct(prod);

        if(classResponse === 'Body format error'){
            return res.status(400).json( {success: false, result: `Wrong body format. The product must be contain 'title', 'description', 'price', 'thumbnail', 'code' and 'stock`});
        };

        if(classResponse === 'Code error'){
            return res.status(400).json( {success: false, result: `This code (${prod.code}) already exists`} )
        }

        return res.status(200).json( {success: true, result: classResponse} )

    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
})


// DELETE BY ID
app.delete('/api/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        let deletedProduct = await productManager.deleteProductById(+pid);

        return (!deletedProduct) ? res.status(404).json({success: false, result: `product with id ${pid} do not exists`}) : res.status(200).json( {success: true, result: deletedProduct} )
    }
    catch (error) {
        res.status(500).json( {success: false, result: error.message} );
    }
})


// UPDATE PRODUCT
app.put('/api/products/:pid', async (req, res) => {
    try {
        let prod = req.body;
        let pid = req.params.pid;
        let updatedProduct = await productManager.updateProduct(+pid, prod);

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
})




conectedServer.on('error', (error) => {
    console.log(error.message);
});