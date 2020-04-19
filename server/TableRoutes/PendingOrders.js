const express = require("express");
const pendingOrders = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
pendingOrders.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.38.1.35";

//Pending Order List
pendingOrders.get("/pendingorder-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/customers/booking/list?page=${
          req.query.page
        }&limit=${10}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        res.setHeader("total-count", `${response.headers["total-count"]}`);
        res.setHeader("help", "5");
        res.status(response.status).send(
          JSON.stringify({
            data: { ...response.data },
            count: response.headers["total-count"],
          })
        );
      })
      .catch((e) => res.status(500).send("Error: " + e));
  });
  
  //PendingOrder search
pendingOrders.get("/pendingorder-search", (req, res) => {
    console.log("request Recieved for filter in node");
    axios
      .get(
        `${baseURL}:8000/customers/booking/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&CreatedAt=${req.query.CreatedAt}&is_order_confirmed=${req.query.is_order_confirmed}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log("response" + response);
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log("ERROR:" + e);
        res.status(500).send("Error: " + e);
      });
  });
  

  module.exports = pendingOrders