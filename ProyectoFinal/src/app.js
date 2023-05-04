const ProductManager = require('./productManager'); // importar la clase

const productManager = new ProductManager(); // crear una instancia

console.log(productManager.getProducts()); // []
productManager.addProduct({
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
});
console.log(productManager.getProducts()); // [{...}]
productManager.addProduct('Producto de prueba', 'Este es un producto de prueba', 100, 'imagen.jpg', '123abc', 10);
productManager.addProduct('Producto de prueba', 'Este es un producto de prueba', 100, 'imagen.jpg', '123abc', 10);
console.log(productManager.getProductById(1))
