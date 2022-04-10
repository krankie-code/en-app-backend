const User = require('../../models/user')

module.exports = function (router) {
  router.get('/users', function (req, res) {
    User.find().exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding users',
          error: err
        }))
  })
  router.get('/user/:id', function (req, res) {
    User.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.get('/user/email/:email', function (req, res) {
    User.find({ email: req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })
  router.post('/user', function (req, res) {
    const user = new User(req.body)
    user.save(function (err, user) {
      if (err) return console.log(err)
      res.status(200).json(user)
    })
  })

  router.put('/user/:id', function (req, res) {
    console.log(req.body)
    const qry = { id: req.params.id }
    const doc = {
      // first: req.body.firstName,
      // last: req.body.lastName,
      // email: req.body.email,
      // password: req.body.password,
      isActive: req.body.isActive
    }
    console.log(doc)
    User.update(qry, doc, function (err, respRaw) {
      if (err) return console.log(err)
      res.status(200).json(respRaw)
    })
  })
}
