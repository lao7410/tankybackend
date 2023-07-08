const fs = require("fs");
const path = require("path");

class CartManager {
  constructor() {
    this.path = path.join(__dirname, "..", "data", "cart.json");
    this.currentId = 1;
  }

  createCart() {
    const carts = this.getCartsFromFile();
    const newCart = {
      id: this.generateCartId(),
      products: [],
    };
    carts.push(newCart);
    this.saveCartsToFile(carts);
    return newCart;
  }
 

  getAllCarts() {
    const carts = this.getCartsFromFile();
    return carts;
  }

  getCartById(id) {
    const carts = this.getCartsFromFile();
    return carts.find((cart) => String(cart.id) === String(id));
  }
 

  addProductToCart(cartId, productId, quantity) {
    const carts = this.getCartsFromFile();

    if (Array.isArray(carts)) {
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(
          (product) => String(product.id) === String(productId)
        );

        if (productIndex !== -1) {
          // Incrementar la cantidad del producto existente
          cart.products[productIndex].quantity += quantity;
        } else {
          // Agregar un nuevo producto al carrito
          cart.products.push({ productId, quantity });
        }

        this.saveCartsToFile(carts); // Guardar los carritos actualizados en el archivo
        return true;
      }
    }

    return false;
  }

  generateCartId() {
    return String(this.currentId++);
  }

  getCartsFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(fileContent);
      return Array.isArray(carts) ? carts : [];
    } catch (error) {
      console.log("Error al leer el archivo de carritos:", error);
      return [];
    }
  }
  

  saveCartsToFile(carts) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
      console.log("Carritos guardados en el archivo exitosamente.");
    } catch (error) {
      console.log("Error al guardar los carritos en el archivo:", error);
    }
  }
}

module.exports = CartManager;
