const express = require('express')
const bodyParser = require('body-parser')
const todoController = require('./server/controller')
const todoModel = require('./server/model')

const app = express() // create app
app.use(express.static('./public')) // give el assets

app.set('view engine', 'ejs') // use ejs as tempalte engine
//fire controllers
todoController(app)

app.listen(5000)
