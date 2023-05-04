const express = require('express');
const router = express.Router();

// Función para generar un producto de ejemplo
function generateExampleProduct() {
  return {
    title: 'Ejemplo de producto',
    price: 1000,
    description: 'Este es un ejemplo de producto ',
    category: 'Ejemplo',
    image: 'https://via.placeholder.com/150',
  };
}

// Función para generar un arreglo con 50 productos de ejemplo
function generateMockProducts() {
  const products = [];
  for (let i = 0; i < 50; i++) {
    const product = generateExampleProduct();
    product.id = i + 1;
    products.push(product);
  }
  return products;
}

// Endpoint para obtener la lista de productos de ejemplo
router.get('/api/v1/mock-products', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});

// Endpoint para obtener la lista de productos generados aleatoriamente
router.get('/mockingproducts', (req, res) => {
    const products = generateMockProducts(50);
    res.json(products);
  });
  

module.exports = {
  router,
};
