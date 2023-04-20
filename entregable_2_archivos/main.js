const fs = require('fs');
class ProductManager {

    constructor (path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
            const products = JSON.parse(fileToRead);
            return products;
        }
        catch(error) {
            console.log(error)
        }
    };

    async addProduct( prod ) {
        if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.code || !prod.stock){
            return 'empty fields';
        };

        try {
            const products = await this.getProducts();
            const productCode = products.find(item => item.code === prod.code);
            let lastIndex = products.length - 1;
    
            if(productCode){ 
                return `This code (${prod.code}) already exists`;
            };
    
            const newProduct = { 
                title: prod.title, 
                description: prod.description,
                price: +prod.price,
                thumbnail: prod.thumbnail, 
                code: prod.code,
                stock: +prod.stock,
                id: products.length>0 ? products[lastIndex].id + 1 : 1,
            };
    
            products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return `Product added successfully with id ${newProduct.id}`;

        }
        catch(error) {
            console.log(error);
        }
    }

    async getProductById( id ) {
        try {
            const products = await this.getProducts();
            const product = products.find(item => item.id === +id);
            return (product != undefined) ? product : `Product with id: '${id}' not found`;
        }
        catch(error) {
            console.log(error)
        }
    }

    async deleteProductById( id ) {
        try {
            let products = await this.getProducts();

            const product = products.find(item => item.id === +id);
            if(product == undefined){
                return `Product with id: '${id}' not found`
            }

            products = products.filter(item => item.id !== +id);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return `Product with id '${id}' was deleted`;
        }
        catch(error) {
            console.log(error);
        }
    }

    async updateProduct( id, prod ) {
        try{
            let products = await this.getProducts();

            const productIndex = products.findIndex(item => item.id === +id);

            if(productIndex === -1){
                return `Product with id: '${id}' not found`
            }

            if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.code || !prod.stock){
                return 'empty fields';
            };

            products[productIndex] = {...prod, id: id};

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return `Product with id '${id}' was updated`;

        }
        catch(error){
            console.log(error);
        }
    }

};


let newProduct = { 
    title: 'Producto 1', 
    description: 'Es el producto 1',
    price: 100,
    thumbnail: 'Sin imagen', 
    code: 'cwl526',
    stock: 10,
    }

let updProduct = { 
    title: 'Producto 4', 
    description: 'Es el producto 4',
    price: 400,
    thumbnail: 'Sin imagen', 
    code: 'cwl526',
    stock: 40,
    }


const products = new ProductManager('./products.json');
const asyncFn = async () => {
    // console.log(await products.getProducts());
    // console.log(await products.addProduct(newProduct));
    // console.log(await products.getProductById(2));
    // console.log(await products.deleteProductById(3));
    console.log(await products.updateProduct( 4, updProduct ));
}

asyncFn();













// products.getProducts().then(res =>{
//     console.log(res);
// })
// console.log(products.getProducts())

// console.log(products.addProduct('prod1', 'es un prod', 100, 'sin imagen', 'gae754', 10));
// console.log(products.addProduct('PROD2', 'ES UN PROD', 200, 'SIN IMAGEN', '2abc74f3', 20));
// console.log(products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 'abe123', 30));
// console.log(products.addProduct('prod4', 'es un prod', 400, 'sin imagen', 'ycw687', 40));


//! ERROR POR CAMPOS VACÍOS 
// console.log(products.addProduct('prod3', 'es un prod', 300, 'sin imagen', 30));

//! ERROR POR CODE EXISTENTE 
// console.log(products.addProduct('prod5', 'es un prod', 500, 'sin imagen', 'gae754', 50));

//! ERROR POR ID NOT FOUND
// console.log(products.getProductById('9'));


// GET ALL
// console.log(products.getProducts());

// PRODUCT BY ID
// console.log(products.getProductById('2'));
// console.log(products.getProductById(3));