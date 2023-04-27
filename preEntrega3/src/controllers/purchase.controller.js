const { Cart } = require('../models/cart.model')
const { Product } = require('../models/product.model')
const { Purchase } = require('../models/purchase.model')

const makePurchase = async (req, res) => {
  try {
    // Obtener el carrito actual del usuario
    const userId = req.user.id
    const cart = await Cart.findOne({ userId }).populate('items.product')

    // Verificar si hay suficiente stock para todos los productos del carrito
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ status: 'error', error: `Not enough stock for product ${item.product.name}` })
      }
    }

    // Actualizar el stock y crear la compra
    const purchases = []
    for (const item of cart.items) {
      const product = item.product
      product.stock -= item.quantity
      await product.save()

      const purchase = new Purchase({
        productId: product.id,
        userId,
        quantity: item.quantity,
        price: product.price * item.quantity
      })
      await purchase.save()

      purchases.push(purchase)
    }

    // Limpiar el carrito
    cart.items = []
    await cart.save()

    // Generar el ticket de compra
    const ticket = {
      purchases,
      total: purchases.reduce((acc, purchase) => acc + purchase.price, 0)
    }

    return res.json({ status: 'success', data: ticket })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ status: 'error', error: 'Internal server error' })
  }
}

module.exports = {
  makePurchase
}
