const express = require('express');
const ProductManager = require('./ProductManager.js');

const PORT = process.env.PORT || 8080;
const app = express();

const conectedServer = app.listen(PORT, () => {
    console.log(`🚀Server is up and running on port: ${PORT}🚀`);
})

const products = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/products', async (req, res) => {
    let limit = req.query.limit;
    console.log(limit)
    const allProducts = await products.getProducts();
    let nProducts = allProducts.slice(0, +limit);

    return (!limit) ? res.send(allProducts) : res.send(nProducts)

});

app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid;
    const product = await products.getProductById(+pid)
    return res.send(product)
});






conectedServer.on('error', (error) => {
    console.log(error.message);
});