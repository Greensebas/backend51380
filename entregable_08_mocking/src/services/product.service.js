import { ProductsModel } from '../models/product.schema.js';
import url from 'url'

export class ProductService {

    // validateProduct(prod) {
    //     if (!prod.title || !prod.description || !prod.price || !prod.status || !prod.category || !prod.code || !prod.stock) {
    //         return 'Body format error';
    //     };
    // }

    // validateId(id) {
    //     if(!id) {
    //     return `ID error`
    //     };
    // }


    async getProducts(query, limit, page, sort, currentUrl) {
        try {
            const res = await ProductsModel.paginate(query, { limit: limit || 2, page: page || 1, lean: true, sort: sort } );
            const { docs, ...rest } = res;
            const products = docs;
            let pagination = rest;

            if(pagination.hasNextPage) {
                const parsedUrl = url.parse(currentUrl, true);
                parsedUrl.query.page = pagination.nextPage;
                let nextLink = url.format({
                    pathname: parsedUrl.pathname,
                    query: parsedUrl.query
                });
                pagination.nextLink = `${nextLink}`;
            } else {
                pagination.nextLink = null;
            };

            if(pagination.hasPrevPage) {
                const parsedUrl = url.parse(currentUrl, true);
                parsedUrl.query.page = pagination.prevPage;
                let prevLink = url.format({
                    pathname: parsedUrl.pathname,
                    query: parsedUrl.query
                });
                pagination.prevLink = `${prevLink}`;
            } else {
                pagination.prevLink = null;
            };

            return {products, pagination};
        }
        catch (error) {
            throw new Error(error.message);
        }
    };


    async addProduct(prod) {
        try {
            this.validateProduct(prod);

            let newProduct = await ProductsModel.create(prod);
            return newProduct;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async getProductById(id) {
        try {
            this.validateId(id);

            const product = await ProductsModel.findOne({ _id: id });
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async deleteProductById(id) {
        try {
            this.validateId(id);

            const product = await ProductsModel.deleteOne({ _id: id });
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

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
    };


}