const express = require("express");
const pendingOrders = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
pendingOrders.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136";

//Pending Order List
pendingOrders.get("/pendingorder-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/customers/booking/list?page=${req.query.page}&limit=${req.query.limit}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&slot_time=${req.query.slot_time}&slot_date=${req.query.slot_date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&created_at=${req.query.created_at}&is_order_confirmed=${req.query.is_order_confirmed}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        res.status(response.status).send({
          data: { ...response.data },
          count: response.headers["total-count"],
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send(e);
      });
  });
  

  module.exports = pendingOrders