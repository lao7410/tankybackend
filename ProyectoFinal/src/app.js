const ProductManager = require('./productManager');

const productManager = new ProductManager();

console.log(productManager.getProducts()); // []

try {
  productManager.addProduct({
    title: 'producto prueba1',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc1234',
    stock: 25
  });
  console.log(productManager.getProducts()); // [{...}]
} catch (error) {
  console.error('Error al agregar el producto:', error.message);
}

try {
  productManager.addProduct({
    title: 'Producto de prueba2',
    description: 'Este es un producto de prueba',
    price: 100,
    thumbnail: 'imagen.jpg',
    code: '123abc5',
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

  console.log(productManager.getProductById(3));
} catch (error) {
  console.error('Error al obtener el producto:', error.message);
}