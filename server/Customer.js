const express = require("express");
const customer = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
customer.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136";


// customer.get("/")





module.exports = customer