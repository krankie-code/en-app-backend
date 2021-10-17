const mongoose = require('mongoose')
const Punctuation = require('../../models/punctuation')

module.exports = function (router) {
  router.get('/punctuation/:userId', function (req, res) {
    const qry = {
      userId: mongoose.Types.ObjectId(req.params.userId)
    }
    Punctuation.find(qry).exec()
      .then((punctuation) => res.status(200)
        .json(punctuation))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding punctuation',
          error: err
        }))
  })
  router.post('/punctuation/:userId', function (req, res) {
    const userId = req.params.userId
    const { tries, punctuation } = req.body
    const newPunctuation = { userId, tries, punctuation }
    Punctuation.create(newPunctuation).then((newPunctuation) => {
      console.log('new punctuation added succesfully')
      Punctuation.findOneAndUpdate(userId, { tries: newPunctuation.tries, punctuation: newPunctuation.punctuation }, { upsert: true, new: true }).exec()
        .then((updatedPunctuation) => {
          res.status(200)
            .json(updatedPunctuation)
        })
        .catch(err => res.status(500)
          .json({
            message: 'Error adding new punctuation',
            err: err
          }))
    })
  })
}
