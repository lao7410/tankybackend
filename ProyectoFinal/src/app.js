const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

console.log(productManager.getProducts()); // []

try {
  productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  });
  console.log(productManager.getProducts()); // [{...}]
} catch (error) {
  console.error('Error al agregar el producto:', error.message);
}

try {
  productManager.addProduct({
    title: 'Producto de prueba',
    description: 'Este es un producto de prueba',
    price: 100,
    thumbnail: 'imagen.jpg',
    code: '123abc',
    stock: 10
  });
  console.log(productManager.getProducts()); // [{...}, {...}]
} catch (error) {
  console.error('Error al agregar el producto:', error.message);
}

try {
  productManager.addProduct({
    title: 'Producto de prueba',
    description: 'Este es un producto de prueba',
    price: 100,
    thumbnail: 'imagen.jpg',
    code: '123abc',
    stock: 10
  });
  console.log(productManager.getProducts());
} catch (error) {
  console.error('Error al agregar el producto:', error.message);
}

try {
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(2));
} catch (error) {
  console.error('Error al obtener el producto:', error.message);
}