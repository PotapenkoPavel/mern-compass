const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./api/models/db')

const apiRouter = require('./api/routes/index')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app
