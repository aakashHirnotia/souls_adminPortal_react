const express = require("express");
const assignPartners = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
assignPartners.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136";
// const baseURL = "http://10.38.1.35";

//Assign Partner List
assignPartners.get("/assign-partner-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/assign-partner/list?page=${req.query.page}&limit=${req.query.limit}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}&slot_time=${req.query.slot_time}&slot_date=${req.query.slot_date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&created_at=${req.query.created_at}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
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

//   //Assign Partner search
// assignPartners.get("/assign-partner-search", (req, res) => {
//     console.log("request Recieved for filter in node");
//     axios
//       .get(
//         `${baseURL}:8000/assign/partner/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&partner_souls_id=${req.query.partner_souls_id}&partner_name=${req.query.partner_name}&partner_mobileno=${req.query.partner_mobileno}&CreatedAt=${req.query.CreatedAt}&status=${req.query.status}`,
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

  


//Assign Member Update
assignPartners.put("/update-assign-partner", (req, res) => {
    const today = new Date();
    const userData = {
      partner_souls_id: req.body.partner_souls_id,
      partner_name: req.body.partner_name,
      partner_mobileno: req.body.partner_mobileno,
      Commission_Type: req.body.Commission_Type,
      commission_type: req.body.commission_type,
      updated_by: req.body.updated_by,
      status: req.body.status,
    };
    axios
      .put(`${baseURL}:8000/assignpartner/update-assign-partner`, userData, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        res.status(response.status).send(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
        res.status(500).send(e);
      });
    console.log(userData.customer_name);
  });
  

module.exports = assignPartners