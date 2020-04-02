const express = require('express')
const users = express.Router()
const cors = require('cors')
const axios = require('axios')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const request = require('request')

// const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {  
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    joining: req.body.joining,
    address: req.body.address,
    status: req.body.status,
    mobile: req.body.mobile
  }
  
  request.post('http://localhost:8000/team/add-member', userData, function (error, response, body) {
    if (!error && response.status == 201) {
      console.log(body)
      res.status(response.status).send(response.data)
    }
  })

  console.log("Register request received in node")
  console.log("Name: "+userData.first_name)

})

users.post('/login', (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  axios
  .post('http://localhost:8000/team/login',userData)
  .then(response => {
    console.log(response)
    if(response.status === 200) {
      
    }
    console.log('Logged In')
  }).catch(e=> console.log(e))
  console.log("LOGIN request received")
})

users.get('/profile', (req, res) => {

})


users.post('/update', (req, res) => {  
  // const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    joining: req.body.joining,
    address: req.body.address,
    status: req.body.status,
    mobile: req.body.mobile
  }
  
  request.post('http://localhost:8000/api/users', userData, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  })



  console.log("Update request received in node")
  console.log("Name: "+userData.first_name)

})


module.exports = users
