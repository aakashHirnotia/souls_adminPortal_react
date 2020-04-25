const express = require("express");
const transactions = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
transactions.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://localhost";

//transaction List
transactions.get("/transaction-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/customers/transaction/list?page=${req.query.page}&limit=${req.query.limit}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}&slot_time=${req.query.slot_time}&slot_date=${req.query.slot_date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&created_at=${req.query.created_at}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}`, {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log("response" + response);
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
  

  
//   //Transaction search
// transactions.get("/transaction-search", (req, res) => {
//     console.log("request Recieved for filter in node");
//     axios
//       .get(
//         `${baseURL}:8000/customers/transaction/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&CreatedAt=${req.query.CreatedAt}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${req.headers.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         res.status(response.status).send(response.data);
//       })
//       .catch((e) => {
//         console.log("ERROR:" + e);
//         res.status(500).send("Error: " + e);
//       });
//   });

  //Transaction Update
transactions.put("/update-transaction", (req, res) => {
    const today = new Date();
    const userData = {
      number_of_therapist: req.body.number_of_therapist,
      therapist_gender: req.body.therapist_gender,
      massage_for: req.body.massage_for,
      slot_time: req.body.Slot_Time,
      slot_date: req.body.Slot_Date,
      massage_duration: req.body.massage_duration,
      customer_address: req.body.customer_address,
      pincode: req.body.pincode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      merchant_transaction_id: req.body.merchant_transaction_id,
    };
    axios
      .put(`${baseURL}:8000/customers/transaction/update`, userData, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send(e);
      });
    console.log(userData.number_of_therapist);
  });
  

module.exports = transactions