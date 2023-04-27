const Ticket = require("./models/ticket.model");

class TicketDaoMongo {
  async create(ticket) {
    const createdTicket = await Ticket.create(ticket);
    return createdTicket.toObject();
  }

  async findById(id) {
    const ticket = await Ticket.findById(id).populate("purchaser");
    return ticket ? ticket.toObject() : null;
  }

  async findByCode(code) {
    const ticket = await Ticket.findOne({ code }).populate("purchaser");
    return ticket ? ticket.toObject() : null;
  }
}

module.exports = TicketDaoMongo;
