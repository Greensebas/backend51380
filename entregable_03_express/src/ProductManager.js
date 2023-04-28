const fs = require('fs');
class ProductManager {

    constructor (path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
                const products = JSON.parse(fileToRead);
                return products;
            } else {
                await fs.promises.writeFile(this.path, '[]');
                const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
                const products = JSON.parse(fileToRead);
                return products;
            }
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

module.exports = ProductManager;