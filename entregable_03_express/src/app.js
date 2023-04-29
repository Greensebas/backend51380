const express = require('express');
const ProductManager = require('./ProductManager.js');

const PORT = process.env.PORT || 8080;
const app = express();

const conectedServer = app.listen(PORT, () => {
    console.log(`🚀Server is up and running on port: ${PORT}🚀`);
})

const products = new ProductManager('./db/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/products', async (req, res) => {
    let limit = req.query.limit;
    const allProducts = await products.getProducts();
    let nProducts = allProducts.slice(0, +limit);

    return (!limit) ? res.status(200).send(allProducts) : res.status(200).send(nProducts)

});

app.get('/api/products/:pid', async (req, res) => {
    let pid = req.params.pid;
    const product = await products.getProductById(+pid)
    return res.status(200).send(product)
    // return (!product) ? res.status(402).send(`product with id ${pid} do not exists`) : res.status(200).send(product)
});






conectedServer.on('error', (error) => {
    console.log(error.message);
});