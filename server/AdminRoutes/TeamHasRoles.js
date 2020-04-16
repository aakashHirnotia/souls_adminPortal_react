const express = require("express");
const teamHasRoles = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
teamHasRoles.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136";

teamHasRoles.put("/updateTeamRole", (req, res) => {
    const userData = {
      teamid: req.body.teamid,
      role_name: req.body.role,
    };
    console.log("Role change request Received!");
    console.log(userData.teamid + " " + userData.role);
  
    axios
      .put(`${baseURL}:8000/team/has-role/update`, userData, {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      })
      .then((response) => {
        // console.log(response)
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("Error: " + e);
      });
  });
  
  teamHasRoles.get("/searchTeamHasRole", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    console.log("request Recieved for filter in node");
    axios
      .get(
        `${baseURL}:8000/team/has-role/list?status=${req.query.status}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}`,
        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response)
        res.status(response.status).send(response.data);
      })
      .catch((e) => {
        console.log("ERROR:" + e);
        res.status(500).send("Error: " + e);
      });
  });
  
  teamHasRoles.get("/team-has-role-list", (req, res) => {
    console.log(
      "pagination request received in node, page is " +
        req.query.page +
        " and countsPerPage is 5"
    );
    axios
      .get(
        `${baseURL}:8000/team/has-role/list?page=${query.page}&limit=${query.limit}&teamid=${query.teamid}&firstname=${query.firstname}&lastname=${query.lastname}&teamhasroleid=${query.team_has_role_id}&status=${query.status}&createdat=${query.CreatedAt}&updatedat=${query.UpdatedAt}`,        {
          headers: {
            Authorization: `Bearer ${req.headers.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(" dfdfvfsd" +response)
        res.setHeader("total-count", `${response.headers["total-count"]}`);
        res.setHeader("hellp", "5");
        res.status(response.status).send(
          JSON.stringify({
            data: { ...response.data },
            count: response.headers["total-count"],
          })
        );
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("Error: " + e);
      });
  });
  

  module.exports = teamHasRoles