class CartRepositories {
    constructor(cartDao) {
      this.cartDao = cartDao;
    }
  
    async getCartByUserId(userId) {
      return this.cartDao.getCartByUserId(userId);
    }
  
    async addProductToCart(cartId, productId, quantity) {
      return this.cartDao.addProductToCart(cartId, productId, quantity);
    }
  
    async deleteProductFromCart(cartId, productId) {
      return this.cartDao.deleteProductFromCart(cartId, productId);
    }
  
    async updateProductQuantity(cartId, productId, quantity) {
      return this.cartDao.updateProductQuantity(cartId, productId, quantity);
    }
  
    async clearCart(cartId) {
      return this.cartDao.clearCart(cartId);
    }
  }
  
  module.exports = CartRepositories;
  