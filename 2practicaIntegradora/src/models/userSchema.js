const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let collection = 'usuarios';

const userSchema = new Schema({
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
    index: true,
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
    enum: ['admin', 'user'],
    default: 'user'
  }
});

userSchema.plugin(mongoosePaginate);

let User = model('User', userSchema);

module.exports = { User };
