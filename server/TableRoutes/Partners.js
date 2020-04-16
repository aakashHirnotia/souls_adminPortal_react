const express = require("express");
const partners = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
partners.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.38.1.35";

partners.get("/partner-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(`${baseURL}:8000/partner/list?page=${req.query.page}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        // console.log(response)
  
        res.status(response.status).send({
          data: { ...response.data },
          count: response.headers["total-count"],
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("Error: " + e);
      });
  });
  
  partners.get("/search-partner", (req, res) => {
    // console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
    console.log("request Recieved for filter in node");
    axios
      .get(
        `${baseURL}:8000/partner/list?partner_id=${req.query.partner_id}&partner_name=${req.query.partner_name}&partner_email=${req.query.partner_email}&partner_mobileno=${req.query.partner_mobileno}&pincode=${req.query.pincode}&Rate=${req.query.Rate}&Commission_Type=${req.query.Commission_Type}&UpdatedAt=${req.query.UpdatedAt}&CreatedAt=${req.query.CreatedAt}&partner_gender=${req.query.partner_gender}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log("ERROR:" + e);
        res.status(500).send("Error: " + e);
      });
  });
  
  // register partner
  partners.post("/registerPartner", (req, res) => {
    const today = new Date();
    const partnerData = {
      partner_name: req.body.partner_name,
      partner_email: req.body.partner_email,
      partner_mobileno: req.body.partner_mobileno,
      partner_address: req.body.partner_address,
      pincode: req.body.pincode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      // Onboard_Date: req.body.Onboard_Date,
      created_by: req.body.created_by,
      updated_by: req.body.updated_by,
      rate: req.body.rate,
      commission_type: req.body.commission_type,
      partner_gender: req.body.partner_gender,
    };
  
    axios
      .post(`${baseURL}:8000/partner/register`, partnerData, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        console.log("dfghj ------------  ");
        // console.log(response.data);
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
        res.status(500).send(e);
      });
  
    console.log("Register request received in node");
    console.log(
      "Name: " + partnerData.partner_name + " " + partnerData.partner_address
    );
  });
  
  //update partner
  partners.put("/update-partner", (req, res) => {
    const today = new Date();
    const partnerData = {
      partner_name: req.body.partner_name,
      partner_email: req.body.partner_email,
      partner_mobileno: req.body.partner_mobileno,
      partner_address: req.body.partner_address,
      pincode: req.body.pincode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      created_by: req.body.created_by,
      updated_by: req.body.updated_by,
      rate: req.body.rate,
      partner_gender: req.body.partner_gender,
      commission_type: req.body.commission_type,
    };
  
    axios
      .put(`${baseURL}:8000/partner/update`, partnerData, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        // console.log(response.status);
        res.status(response.status).send(response.data);
        // console.log(response)
      })
      .catch((e) => {
        console.log("ERROR");
        console.log(e);
        res.status(500).send(e);
      });
    console.log("Upadate memeber request received in node");
    console.log("Name: " + partnerData.partner_name);
  });
  

module.exports = partners
