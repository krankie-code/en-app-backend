require('dotenv').config()
const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Joi = require('@hapi/joi')
/* const session = require('express-session')
const MongoStore = require("connect-mongo") */


app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// routes Middleware
app.use('/api', api)
app.use(express.static('static'))

app.get('/', (req, res, next) =>{
  res.send('home')
})


app.use(morgan('dev'))

/* app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
}) */

const mongoose = require('mongoose')
mongoose.connect(
  process.env.DB_CONNECT
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error :'))
db.once('open', function () {
  console.log('Connected to MongoDB')
  app.listen(app.get('port'), function () {
    console.log('API Server Listening on port ' + app.get('port'))
  })
})