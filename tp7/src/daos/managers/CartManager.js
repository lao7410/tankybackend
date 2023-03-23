const Carrito = require('./models/Carrito');

class CartManager {
  constructor() {}

  async addCart() {
    try {
      const carrito = await Carrito.create({ productos: [] });
      return carrito;
    } catch (err) {
      throw new Error("Error al crear el carrito", err);
    }
  }

  async getCarritos() {
    const carritos = await Carrito.findAll();
    return carritos;
  }

  async getCarritosById(id) {
    try {
      const carrito = await Carrito.findByPk(id);
      if (!carrito) throw new Error("Carrito no encontrado");
      return { find: carrito, idx: null };
    } catch (err) {
      throw new Error("Error al buscar el carrito por ID", err);
    }
  }

  async getCartProducts(id) {
    try {
      const carrito = await Carrito.findByPk(id);
      if (!carrito) throw new Error("Carrito no encontrado");
      return carrito.productos;
    } catch (err) {
      throw new Error("Error al buscar los productos del carrito", err);
    }
  }

  async addProdToCart(cid, pid) {
    try {
      const carrito = await Carrito.findByPk(cid);
      if (!carrito) throw new Error("Carrito no encontrado");

      const prodFind = carrito.productos.find(prod => prod.product === pid);
      if (prodFind) {
        prodFind.quantity++;
      } else {
        carrito.productos.push({ product: pid, quantity: 1 });
      }

      await carrito.save();
      return carrito;
    } catch (err) {
      throw new Error("Error al agregar producto al carrito", err);
    }
  }
}

module.exports = CartManager;
