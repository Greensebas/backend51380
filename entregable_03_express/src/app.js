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
    const allProducts = await products.getProducts();
    res.send(allProducts);
});








conectedServer.on('error', (error) => {
    console.log(error.message);
});