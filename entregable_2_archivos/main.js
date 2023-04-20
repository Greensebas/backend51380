const fs = require('fs');
class ProductManager {

    constructor (path) {
        this.path = path;
    }

    async getProducts() {
        const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
        const products = JSON.parse(fileToRead);
        return products;
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

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return `Product added successfully with id ${newProduct.id}`;

        }
        catch(error) {
            console.log(error);
        }
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === +id);
        return (product != undefined) ? product : `Product with id: ${id} not found`;
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



const products = new ProductManager('./products.json');
const asyncFn = async () => {
    console.log(await products.getProducts());
    console.log(await products.addProduct(newProduct));
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