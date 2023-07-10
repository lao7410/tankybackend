const mongoose = require("mongoose");

class MongoDBManager {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.find().exec();
  }

  getById(id) {
    return this.model.findById(id).exec();
  }

  create(data) {
    const newDocument = new this.model(data);
    return newDocument.save();
  }

  update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id) {
    return this.model.findByIdAndDelete(id).exec();
  }
}

module.exports = MongoDBManager;
