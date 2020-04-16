var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000


app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
// app.use(cookieParser());
// const bodyParser = require('body-parser');  

var Users = require('./Users')
var Customer = require('./Customer')
app.use('/users', Users)
app.use('/customer', Customer)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})