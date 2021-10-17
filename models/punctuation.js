const mongoose = require('mongoose')
const Schema = mongoose.Schema

const punctuation = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  punctuation: { type: Number, default: 0 },
  tries: { type: Number, default: 0 }
})

const Punctuation = mongoose.model('Punctuation', punctuation)

module.exports = Punctuation
