const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userCollection = 'Usuarios'
const userSchema = Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Carts'
  },
  role: {
    type: String,
    default: 'user'
  }
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model(userCollection, userSchema);
