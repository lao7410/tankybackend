const { OrderModel } = require("./models/order.model");

class OrderDaoMongo {
  constructor() {
    this.orderModel = OrderModel;
  }

  async get() {
    try {
      return await this.orderModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(oid) {
    try {
      return await this.orderModel.findById(oid);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(newOrder) {
    try {
      return await this.orderModel.create(newOrder);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updatedOrder) {
    try {
      const order = await this.orderModel.findByIdAndUpdate(id, updatedOrder, {
        new: true,
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const order = await this.orderModel.findByIdAndDelete(id);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = OrderDaoMongo;
