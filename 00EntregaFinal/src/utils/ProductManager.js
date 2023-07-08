const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.currentId = 1;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    product.id = this.currentId++;
    products.push(product);
    this.saveProductsToFile(products);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(product => product.id === id);
    return product ? product : null;
  }

  getProductsFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.log('Error al leer el archivo de productos:', error);
      return [];
    }
  }
  
  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === id);
  
    if (productIndex !== -1) {
      // Actualizar el producto con los campos actualizados
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToFile(products); // Guardar los productos actualizados en el archivo
      console.log(`Producto con ID ${id} actualizado correctamente.`);
    } else {
      console.log(`No se encontró ningún producto con ID ${id}.`);
    }
  }
  
  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === id);
  
    if (productIndex !== -1) {
      // Eliminar el producto del arreglo
      products.splice(productIndex, 1);
      this.saveProductsToFile(products); // Guardar los productos actualizados en el archivo
      console.log(`Producto con ID ${id} eliminado correctamente.`);
    } else {
      console.log(`No se encontró ningún producto con ID ${id}.`);
    }
  }
  
  saveProductsToFile(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      console.log('Productos guardados en el archivo exitosamente.');
    } catch (error) {
      console.log('Error al guardar los productos en el archivo:', error);
    }
  }
}

module.exports = ProductManager;
