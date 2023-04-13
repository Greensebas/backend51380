class ProductManager {

    constructor () {
        this.products = [];
    }

    getProducts() {
        return console.log(this.products) ;
    };

    addProduct( title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(product)
    }

    getProductById(id) {
        const product = this.products.find(item => item.code === id);
        return console.log(product);
    }

};

const products = new ProductManager();

products.getProducts();

products.addProduct('prod1', 'es un prod', 400, 'sin imagen', '1abc123', 21);
products.addProduct('PROD2', 'ES UN PROD', 400, 'SIN IMAGEN', '2abc123', 21);
products.addProduct('prod3', 'es un prod', 400, 'sin imagen', '3abc123', 21);
products.addProduct('prod4', 'es un prod', 400, 'sin imagen', '4abc123', 21);

products.getProducts();

products.getProductById('2abc123');