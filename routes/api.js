const express = require('express')
const Ninja = require('../models/ninja')
const router = express.Router()

router.get('/ninjas', (req, res, next) => {
  // Ninga.find({})
  // res.send({ type: 'GET' })
  Ninja.geoSearch(
    {
      type: 'Point',
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    },
    { maxDistance: 100000, spherical: true }
  )
    .then((ninjas) => {
      res.send(ninjas)
    })
    .catch(next)
})

router.post('/ninjas', (req, res, next) => {
  // var ninga = new Ninga(req.body)
  // ninga.save()
  Ninja.create(req.body).then((ninja) => {
    res.send(ninja)
  })
})

router.put('/ninjas/:id', (req, res, next) => {
  Ninja.findOneAndUpdate({ _id: req.params.id }, req.body).then((ninja) => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja)
    })
  })
})

router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findOneAndDelete({ _id: req.params.id }).then((ninja) => {
    res.send(ninja)
  })
})

module.exports = router
