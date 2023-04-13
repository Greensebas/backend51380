class ProductManager {

    constructor () {
        this.products = [];
    }

    getProducts() {
        return this.products;
    };

    addProduct( title, description, price, thumbnail, code, stock) {
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log('empty fields');
        };

        const products = this.getProducts();
        const productCode = this.products.find(item => item.code === code);

        if(productCode){ 
            return console.log(`This code (${code}) already exists`);
        };

        const newProduct = { 
            title, 
            description, 
            price: +price,
            thumbnail, 
            code,
            stock: +stock,
            id: null,
        };

        if(products.length > 0){
            let lastIndex = products.length - 1;
            newProduct.id = products[lastIndex].id +1;

            this.products.push(newProduct);
        }else{
            newProduct.id = 1;

            this.products.push(newProduct);
        }
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === +id);
        if(product){
            return product;
        }else{
            return `Product with id: ${id} not found`
        };

        //! Este es el ternario de la muerte que no me funciona
        // (product != undefined) ? product : 'Product not found';

    }

};

const products = new ProductManager();

console.log(products.getProducts())

products.addProduct('prod1', 'es un prod', 100, 'sin imagen', 'gae754', 10);
products.addProduct('PROD2', 'ES UN PROD', 200, 'SIN IMAGEN', '2abc74f3', 20);
products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 'abe123', 30);
products.addProduct('prod4', 'es un prod', 400, 'sin imagen', 'ycw687', 40);   

//! ERROR POR CAMPOS VACÍOS 
products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 30);

//! ERROR POR CODE EXISTENTE 
products.addProduct('prod5', 'es un prod', 500, 'sin imagen', 'gae754', 50);   

//! ERROR POR ID NOT FOUND
console.log(products.getProductById('9'));


// GET ALL
console.log(products.getProducts());

// PRODUCT BY ID
console.log(products.getProductById('2'));
console.log(products.getProductById(3));