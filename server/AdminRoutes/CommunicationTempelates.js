const express = require("express");
const communicationTempelates = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
communicationTempelates.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.38.1.35";


//communication tempelate list
communicationTempelates.get("/communicationTempelateList", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/team/communicationTempelateList?page=${
          req.query.page
        }&limit=${10}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        res.status(response.status).send({
          data: { ...response.data },
          count: response.headers["total-count"],
        });
        // res.status(response.status).send(response.headers);
      })
      .catch((e) => res.status(500).send("Error: " + e));
  });
  
  //search communication tempelate
  communicationTempelates.get("/searchCommTempelate", (req, res) => {
    console.log("request Recieved for filter in node");
    axios
      .get(
        `${baseURL}:8000/searchCommTempelate?communicationTempelateID=${req.query.communicationTempelateID}&type=${req.query.type}&trigger_time=${req.query.trigger_time}&trigger_for=${req.query.trigger_for}&smsContent=${req.query.smsContent}&subject=${req.query.subject}&emailContent=${req.query.emailContent}&status=${req.query.status}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log("ERROR:" + e);
        res.status(500).send("Error: " + e);
      });
  });
  
  // create comm tmpelate
  communicationTempelates.post("/createCommTempelate", (req, res) => {
    const today = new Date();
    const Data = {
      type: req.body.type,
      trigger_time: req.body.trigger_time,
      trigger_for: req.body.trigger_for,
      smsContent: req.body.smsContent,
      subject: req.body.subject,
      emailContent: req.body.emailContent,
      status: req.body.status,
    };
  
    axios
      .post(`${baseURL}:8000/commTempelate/create`, Data, {
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
  });
  
  //update comm tempelate
  communicationTempelates.put("/updateCommTempelate", (req, res) => {
    const today = new Date();
    const Data = {
      type: req.body.type,
      trigger_time: req.body.trigger_time,
      trigger_for: req.body.trigger_for,
      smsContent: req.body.smsContent,
      subject: req.body.subject,
      emailContent: req.body.emailContent,
      status: req.body.status,
    };
  
    axios
      .put(`${baseURL}:8000/commTempelate/update`, Data, {
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
  });
  
  module.exports = communicationTempelates;
  