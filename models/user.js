const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, max: 255, min: 6 },
  password: { type: String, required: true, max: 1024, min: 6 },
  isActive: { type: Boolean, default: true },
  createdON: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports = User
