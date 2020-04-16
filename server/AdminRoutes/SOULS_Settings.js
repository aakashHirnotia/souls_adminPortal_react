const express = require("express");
const SOULS_Settings = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
SOULS_Settings.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.38.1.35";




//Souls Settings List
SOULS_Settings.get("/soulsSettings", (req, res) => {
    // console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
    // console.log("aakash")
    axios
      .get(`${baseURL}:8000/team/soulsSettings`, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        // console.log(response)
        res.status(response.status).send(response.data);
        // res.status(response.status).send(response.headers);
      })
      .catch((e) => res.status(500).send("Error: " + e));
  });
  
  // update souls settings
  SOULS_Settings.put("/updateSettings", (req, res) => {
    const today = new Date();
    const settingsData = {
      soulsSettingsID: req.body.soulsSettingsID,
      url: req.body.url,
      description: req.body.description,
      hostname: req.body.hostname,
      username: req.body.username,
      password: req.body.password,
    };
  
    axios
      .put(`${baseURL}:8000/settings/update`, settingsData, {
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
    console.log("Name: " + settingsData.username);
  });
  

  module.exports = SOULS_Settings