const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path || './data/products.json';
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
    this.products.push(newProduct);
    this.saveProductsToFile();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return;
    this.products[index] = { id, ...updatedProduct };
    this.saveProductsToFile();
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return;
    this.products.splice(index, 1);
    this.saveProductsToFile();
  }
}

module.exports = ProductManager;


/* class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('All fields are required.');
        return;
      }
      if (this.getProductByCode(code)) {
        console.error(`Product with code "${code}" already exists.`);
        return;
      }
      const product = {
        id: ++this.lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.products.push(product);
      console.log(`Product with id "${product.id}" has been added.`);
    }
  
    getProductByCode(code) {
      return this.products.find(p => p.code === code);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        return product;
      } else {
        console.error(`Product with id "${id}" not found.`);
      }
    }
  }
  
  module.exports = ProductManager; // exportar la clase


 */