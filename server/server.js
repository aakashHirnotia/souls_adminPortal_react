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

var Users = require('./TableRoutes/Users')
var Customers = require('./TableRoutes/Customers')
var Partners = require('./TableRoutes/Partners')
var PendingOrders = require('./TableRoutes/PendingOrders')
var Transactions = require('./TableRoutes/Transactions')
var AssignPartners = require('./TableRoutes/AssignPartners')

var TeamHasRoles = require('./AdminRoutes/TeamHasRoles')
var SOULS_Settings = require('./AdminRoutes/SOULS_Settings')
var CommunicationTempelates = require('./AdminRoutes/CommunicationTempelates')

app.use('/users', Users)
app.use('/customers', Customers)
app.use('/partners', Partners)
app.use('/pendingOrders', PendingOrders)
app.use('/transactions', Transactions)
app.use('/assignPartners', AssignPartners)

app.use('/teamHasRoles', TeamHasRoles)
app.use('/SOULS_Settings', SOULS_Settings)
app.use('/communicationTempelates', CommunicationTempelates)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})