class TicketRepositories {
    constructor(ticketDao) {
      this.ticketDao = ticketDao;
    }
  
    async createTicket(orderId, totalPrice) {
      return this.ticketDao.createTicket(orderId, totalPrice);
    }
  
    async getTicketByOrderId(orderId) {
      return this.ticketDao.getTicketByOrderId(orderId);
    }
  }
  
  module.exports = TicketRepositories;
  