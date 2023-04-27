const ProductRpositories = require('../repositories/product.repositories');

class ProductServices {
  constructor(dao) {
    this.repo = new ProductRpositories(dao);
  }

  async getProducts(objConfig) {
    return await this.repo.getProducts(objConfig);
  }

  async createProduct(newProduct) {
    return await this.repo.createProduct(newProduct);
  }

  async getProductById(productId) {
    return await this.repo.getProductById(productId);
  }

  async updateProduct(productId, updateData) {
    return await this.repo.updateProduct(productId, updateData);
  }

  async deleteProduct(productId) {
    return await this.repo.deleteProduct(productId);
  }
}

module.exports = ProductServices;
