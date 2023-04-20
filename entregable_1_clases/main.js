class ProductManager {

    constructor () {
        this.products = [];
    }

    getProducts() {
        return this.products;
    };

    addProduct( title, description, price, thumbnail, code, stock) {
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return 'empty fields';
        };

        const products = this.products;
        const productCode = this.products.find(item => item.code === code);
        let lastIndex = products.length - 1;

        if(productCode){ 
            return `This code (${code}) already exists`;
        };

        const newProduct = { 
            title, 
            description, 
            price: +price,
            thumbnail, 
            code,
            stock: +stock,
            id: this.products.length>0 ? this.products[lastIndex].id + 1 : 1,
        };

        this.products.push(newProduct);
        return `Product added successfully with id ${newProduct.id}`;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === +id);
        return (product != undefined) ? product : `Product with id: ${id} not found`;
    }

};

const products = new ProductManager();

console.log(products.getProducts())

console.log(products.addProduct('prod1', 'es un prod', 100, 'sin imagen', 'gae754', 10));
console.log(products.addProduct('PROD2', 'ES UN PROD', 200, 'SIN IMAGEN', '2abc74f3', 20));
console.log(products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 'abe123', 30));
console.log(products.addProduct('prod4', 'es un prod', 400, 'sin imagen', 'ycw687', 40));


//! ERROR POR CAMPOS VACÍOS 
console.log(products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 30));

//! ERROR POR CODE EXISTENTE 
console.log(products.addProduct('prod5', 'es un prod', 500, 'sin imagen', 'gae754', 50));

//! ERROR POR ID NOT FOUND
console.log(products.getProductById('9'));


// GET ALL
console.log(products.getProducts());

// PRODUCT BY ID
console.log(products.getProductById('2'));
console.log(products.getProductById(3));