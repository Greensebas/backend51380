import { ProductsModel } from '../DAO/models/product.model.js';

export class ProductService {

    validateProduct(prod) {
        if (!prod.title || !prod.description || !prod.price || !prod.status || !prod.category || !prod.code || !prod.stock) {
            return 'Body format error';
        };
    }

    validateId(id) {
        if(!id) {
        return `ID error`
        };
    }


    async getProducts() {
        try {
            const products = await ProductsModel.find({});
            return products
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(prod) {
        try {
            this.validateProduct(prod);

            let newProduct = await ProductsModel.create(prod);
            return newProduct;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            this.validateId(id);

            const product = await ProductsModel.findOne({ _id: id });
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductById(id) {
        try {
            this.validateId(id);

            const product = await ProductsModel.deleteOne({ _id: id });
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(id, prod) {
        try {
            this.validateId(id);
            this.validateProduct(prod);

            const updatedProduct = await ProductsModel.findOneAndUpdate({ _id: id }, prod, { new: true });
            return updatedProduct
        }
        catch (error) {
            throw new Error(error.message);
        }
    }


}