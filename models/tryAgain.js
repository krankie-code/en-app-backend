const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tryAgain = new Schema({
  wordName: { type: String },
  gameType: { type: String },
  tries: { type: Number }
})

const TryAgain = mongoose.model('TryAgain', tryAgain)

module.exports = TryAgain
