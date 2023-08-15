// import { ProductsModel } from '../models/product.schema.js';
import { ProductsDAO } from '../models/daos/app.daos.js';
import url from 'url'

const productDAO = new ProductsDAO()

export class ProductService {

    async getProducts(query, limit, page, sort, currentUrl) {
        try {
            let params = { 
                limit: limit || 2, 
                page: page || 1, 
                lean: true, 
                sort: sort 
            };

            const res = await productDAO.getAll( query, params );
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
            // this.validateProduct(prod);

            let newProduct = await productDAO.addProduct( prod );
            return newProduct;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async getProductById(id) {
        try {
            // this.validateId(id);

            const product = await productDAO.getById( id );
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async deleteProductById( pid ) {
        try {
            // this.validateId(id);

            const product = await productDAO.delete( pid );
            return product
        }
        catch (error) {
            throw new Error(error.message);
        }
    };

    async updateProduct( pid, prod ) {
        try {
            // this.validateId(id);
            // this.validateProduct(prod);

            const updatedProduct = await productDAO.update( pid, prod);
            return updatedProduct
        }
        catch (error) {
            throw new Error(error.message);
        }
    };


};