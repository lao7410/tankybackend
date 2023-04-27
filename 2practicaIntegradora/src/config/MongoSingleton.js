const { connect } = require("mongoose");

class MongoSingleton {
  static #instance;

  constructor() {
    connect("mongodb://localhost:27017/comision32270", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya está conectada");
      return this.#instance;
    }

    this.#instance = new MongoSingleton();
    console.log("conected");
    return this.#instance;
  }
}

module.exports = MongoSingleton;
