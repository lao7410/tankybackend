const { TicketDaoMongo } = require('./mongo/TicketDaoMongo');

class TicketManager {
  constructor() {
    this.ticketDaoMongo = new TicketDaoMongo();
  }

  async createTicket(ticket) {
    return await this.ticketDaoMongo.create(ticket);
  }

  async getTickets() {
    return await this.ticketDaoMongo.findAll();
  }

  async getTicketById(id) {
    return await this.ticketDaoMongo.findById(id);
  }

  async updateTicket(id, ticket) {
    return await this.ticketDaoMongo.update(id, ticket);
  }

  async deleteTicket(id) {
    return await this.ticketDaoMongo.delete(id);
  }
}

module.exports = { TicketManager };
