const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path || './src/data/products.json';
    try {
      const data = fs.readFileSync(this.path);
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  addProduct(product) {
    const lastProduct = this.products[this.products.length - 1];
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id: newId, ...product };
    
    const isCodeDuplicate = this.products.some((p) => p.code === newProduct.code);
    if (isCodeDuplicate) {
      throw new Error('El código del producto ya existe');
    }
    
    this.products.push(newProduct);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Not found');
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return;
    this.products[index] = { id, ...updatedProduct };
    this.saveProductsToFile();
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return;
    this.products.splice(index, 1);
    this.saveProductsToFile();
  }
}

module.exports = ProductManager;
