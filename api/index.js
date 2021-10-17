const express = require('express')
const router = express.Router()

require('./routes/punctuation')(router)
require('./routes/user')(router)

module.exports = router
