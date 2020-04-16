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
var Customers = require('./Customers')
var Partners = require('./Partners')
var PendingOrders = require('./PendingOrders')
var Transactions = require('./Transactions')
var AssignPartners = require('./AssignPartners')

app.use('/users', Users)
app.use('/customers', Customers)
app.use('/partners', Partners)
app.use('/pendingOrders', PendingOrders)
app.use('/transactions', Transactions)
app.use('/assignPartners', AssignPartners)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})