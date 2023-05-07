import fs from 'fs';
import { v4 as uuid } from 'uuid';


class CartManager {

    constructor (path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.path)){
                const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
                const carts = JSON.parse(fileToRead);
                return carts;
            } else {
                await fs.promises.writeFile(this.path, '[]');
                const fileToRead = await fs.promises.readFile(this.path, 'utf-8'); 
                const carts = JSON.parse(fileToRead);
                return carts;
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
    };

    async saveCart() {
        try{
            const carts = await this.getCarts();
            const newCart = {
                id : uuid(),
                products: [],
            }

            carts.push(newCart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return `Cart added successfully with id ${newCart.id}`;
        }
        catch(error) {
            throw new Error(error.message)
        }
    };

    async getCartById( id ) {
        try {
            let carts = await this.getCarts();
            let cart = carts.find(item => item.id === id);
            return ( cart != undefined) ? cart : null;
        }
        catch(error) {
            throw new Error(error.message);
        }
    };

    async addToCart( cid, pid ) {
        try{
            let carts = await this.getCarts();
            let cartIndex = carts.findIndex(item => item.id === cid);
            let cart = await this.getCartById( cid );   // busca el carrito por el cid
            let prodInCartIndex = cart.products.findIndex(item => item.id === pid); // busca el producto en el carrito por el pid

            let prod = {
                id: pid,
                quantity: 1
            };

            if(prodInCartIndex === -1){
                cart.products.push(prod);
                carts[cartIndex] = cart;
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                
                return `Product with id '${pid}' was added`;
            }
            else{
                cart.products[prodInCartIndex].quantity ++;
                carts[cartIndex] = cart;
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

                return `Product with id '${pid}' was added`;
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
    }

}

export {CartManager}