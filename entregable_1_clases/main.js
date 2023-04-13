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
        const productId = this.products.find(item => item.code === +code);

        if(productId){ 
            return console.log('This ID already exists');
        };

        const newProduct = { 
            title, 
            description, 
            price: +price,
            thumbnail, 
            code: +code,
            stock: +stock 
        };

        if(products.length > 0){
            let lastIndex = products.length - 1;
            newProduct.code = products[lastIndex].code +1;

            this.products.push(newProduct);
        }else{
            newProduct.code = 1;

            this.products.push(newProduct);
        }
    }

    getProductById(id) {
        const product = this.products.find(item => item.code === id);
        if(product){
            return product;
        }else{
            return 'Product not found'
        }
        // (product != undefined) ? product : 'Product not found';

    }

};

const products = new ProductManager();

console.log(products.getProducts())

products.addProduct('prod1', 'es un prod', 100, 'sin imagen', 'gae754', 10);
products.addProduct('PROD2', 'ES UN PROD', 200, 'SIN IMAGEN', '2abc74f3', 20);
products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 'abe123', 30);

//! PARA PROBAR ERROR POR CAMPOS VACÍOS 
products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 30);

//! PARA PROBAR ERROR POR ID EXISTENTE 
products.addProduct('prod4', 'es un prod', 400, 'sin imagen', '2', 40);   

console.log(products.getProducts())

console.log(products.getProductById(2))
