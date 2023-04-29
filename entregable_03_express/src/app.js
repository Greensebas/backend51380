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


app.get('/api/products', async (req, res) => {
    try {
        let limit = req.query.limit;
        const allProducts = await productManager.getProducts();
        let nProducts = allProducts.slice(0, +limit);
    
        return (!limit) ? res.status(200).json(allProducts) : res.status(200).json(nProducts)
    }
    catch(error) {
        res.status(500).json(error.message);
    }
});

app.get('/api/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        const product = await productManager.getProductById(+pid)

        return (!product) ? res.status(404).send(`product with id ${pid} do not exists`) : res.status(200).send(product)
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});


conectedServer.on('error', (error) => {
    console.log(error.message);
});