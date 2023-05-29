const fs = require('fs');

class CartManager {
  constructor(path) {
    this.path = path || './src/data/carts.json';
    try {
      const data = fs.readFileSync(this.path);
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCartsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
  }

  createCart() {
    const lastCart = this.carts[this.carts.length - 1];
    const newId = lastCart ? lastCart.id + 1 : 1;
    const newCart = { id: newId, products: [] };

    this.carts.push(newCart);
    this.saveCartsToFile();

    return newCart;
  }

  getProductsInCart(cartId) {
    const cart = this.carts.find((c) => c.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart.products;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find((c) => c.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const existingProduct = cart.products.find((p) => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCartsToFile();
  }
}

module.exports = CartManager;
