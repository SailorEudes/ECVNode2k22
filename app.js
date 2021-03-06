var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
var sqlite = require('sqlite3')
var env = require('dotenv')
var port = process.env.PORT || 8080

// models
var models = require('./models')

// routes
var books = require('./routes/books')
var comments = require('./routes/comments')
var posts = require('./routes/posts')
var roles = require('./routes/roles')
var users = require('./routes/users')

//Sync Database
models.sequelize
  .sync()
  .then(function () {
    console.log('connected to database')
  })
  .catch(function (err) {
    console.log(err)
  })

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

// register routes
app.use('/books', books)
app.use('/comments', comments)
app.use('/posts', posts)
app.use('/roles', roles)
app.use('/users', users)
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// index path
app.get('/', function (req, res) {
  console.log('app listening on port: ' + port)
  res.send('tes express nodejs sqlite')
})

app.listen(port, function () {
  console.log('app listening on port: ' + port)
})

module.exports = app
