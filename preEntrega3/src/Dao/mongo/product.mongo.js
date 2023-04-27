class ProductDaoMongo {
    constructor(productModel) {
      this.product = productModel;
    }
  
    async get({ limit = 10, page = 1, category = '', sort = 1 }) {
      try {
        const query = category.length !== 0 ? { category } : {};
        const options = {
          limit,
          page,
          lean: true,
          sort: { price: sort },
        };
        return await this.product.paginate(query, options);
      } catch (error) {
        console.error(error);
        return new Error(error);
      }
    }
  
    async getById(productId) {
      try {
        return await this.product.findById(productId);
      } catch (error) {
        console.error(error);
        return new Error(error);
      }
    }
  
    async create(newProduct) {
      try {
        return await this.product.create(newProduct);
      } catch (error) {
        console.error(error);
        return new Error(error);
      }
    }
  
    async update(productId, updateProduct) {
      try {
        return await this.product.findByIdAndUpdate(
          { _id: productId },
          updateProduct,
          { new: true }
        );
      } catch (error) {
        console.error(error);
        return new Error(error);
      }
    }
  
    async remove(productId) {
      try {
        return await this.product.findByIdAndUpdate(
          { _id: productId },
          { isActive: false },
          { new: true }
        );
      } catch (error) {
        console.error(error);
        return new Error(error);
      }
    }
  }
  
  module.exports = ProductDaoMongo;
  