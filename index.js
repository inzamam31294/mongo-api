const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose
  .connect('mongodb://localhost/ningago?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'root',
    pass: '123456',
  })
  .then(() => {
    console.log('successfully connected to the database')
  })
  .catch((err) => {
    console.log('error connecting to the database', err)
    process.exit()
  })

mongoose.Promise = global.Promise

app.use(bodyParser.json())

app.use('/api', routes)

app.use((req, res, next, err) => {
  console.log(err)
  res.status(422).send({ error: err.message })
})

app.listen(process.env.port || 3000, () => {
  console.log('listening to port 3000')
})
