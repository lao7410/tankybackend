const express = require('express');
const app = express();
const path = require('path');
const ProductManager = require('./utils/ProductManager');

// Configuración del servidor y middleware

// Rutas y controladores

const filePath = path.join(__dirname, 'data', 'products.json');
const productManager = new ProductManager(filePath);

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción 1',
  price: 10,
  thumbnail: 'imagen1.jpg',
  code: 'ABC123',
  stock: 5
});

const allProducts = productManager.getProducts();
console.log(allProducts);

const productById = productManager.getProductById(2);
console.log(productById);

productManager.updateProduct(1, { price: 15 }); // Actualiza el precio del producto con ID 1 a 15
productManager.deleteProduct(2); // Elimina el producto con ID 2


// Iniciar el servidor
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
