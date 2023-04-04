const { Schema, model } = require("mongoose");

const collection = "carritos";
const CartSchema = new Schema({
  productos: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "productos" },
        quantity: { type: Number },
      },
    ],
  },
});

CartSchema.pre('findOne', function(){
    this.populate('productos.product')
})

module.exports = model(collection, CartSchema);
