import { ProductsSchema } from "../../schemas/product.schema.js";

class ProductMongoDAO {
    async getAll( query, params ) {
        try {
            const products = await ProductsSchema.paginate( query, params );
            return products;
        }
        catch (error) {
            console.log(error)
        }
    };

    async getById( id ) {
        try {
            const product = await ProductsSchema.findOne({ _id: id });
            return product
        }
        catch (error) {
            console.log(error)
        }
    };

    async addProduct( prod ) {
        try {
            let newProduct = await ProductsSchema.create(prod);
            return newProduct;
        }
        catch (error) {
            console.log(error)
        }
    };

    async delete( pid ) {
        try {
            const product = await ProductsSchema.deleteOne({ _id: pid });
            return product
        }
        catch (error) {
            console.log(error)
        }
    };

    async update( pid, prod ) {
        try {
            const updatedProduct = await ProductsSchema.findOneAndUpdate({ _id: pid }, prod, { new: true });
            return updatedProduct
        }
        catch (error) {
            console.log(error)
        }
    };

    async updateStock( pid, stock ) {
        try {
            let res = await ProductsSchema.findOneAndUpdate(
                { _id: pid},
                { $inc: { stock: stock } },
                { new: true}
            );

            return res;
        }
        catch (error) {
            console.log(error)
        }
    };

};

export {ProductMongoDAO}