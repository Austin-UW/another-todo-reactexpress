const mongoose = require('mongoose')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://conrad:cokay202@ds113873.mlab.com:13873/todostuff', {useNewUrlParser: true})
const schema = mongoose.Schema({
  item: String
})

const Todo = mongoose.model('Heyguy', schema)

module.exports = (app) => {
  const urlencodedParser = bodyParser.urlencoded({ extended: true })
  const jsonParser = bodyParser.json()
  app.get('/todo', (req, res) => {
    console.log('get triggered')
    // is good
    Todo.find({}, (err, data) => {
      if(err) {throw err}
      res.json(data)
    })
  })
  app.post('/todo', jsonParser, (req) => {
    console.log('post triggered')
    console.log(req.body)
    Todo(req.body).save((err) => {
      if(err) {throw err}
    })
  })
  app.delete('/todo/:item', urlencodedParser, (req, res) => {
    console.log('delete triggered')
    console.log(req.params.item)
    Todo.deleteOne({item: req.params.item.replace(/-/g, ' ')}, (err, data) => {
      if(err) {throw err}
      res.json(data)
    })
  })
}
