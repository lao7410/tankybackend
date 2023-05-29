const express = require('express');
const ProductManager = require('./productManager');
const CartManager = require('./CartManager');

const app = express();
const productManager = new ProductManager();

app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Endpoint para crear un nuevo producto
app.post('/products', (req, res) => {
  try {
    const product = req.body;
    productManager.addProduct(product);
    res.json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Endpoint para actualizar un producto por su ID
app.put('/products/:pid', (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    productManager.updateProduct(productId, updatedProduct);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

const cartManager = new CartManager();

// Endpoint para crear un nuevo carrito
app.post('/carts', (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Endpoint para obtener los productos de un carrito por su ID
app.get('/carts/:cid', (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = cartManager.getProductsInCart(cartId);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Endpoint para agregar un producto a un carrito
app.post('/carts/:cid/products/:pid', (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = 1; // Se agrega de a uno por ahora, como se menciona en la consigna
    cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
