const express = require("express");
const users = express.Router();
const cors = require("cors");
const axios = require("axios");
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const request = require("request");

// const User = require('../models/User')
users.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.42.0.69";
// const baseURL = "http://localhost"
// process.env.MODE === "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    firstname: req.body.first_name || "AShish",
    lastname: req.body.last_name || "kumar",
    // gender: req.body.gender,
    email: req.body.email || "sds@af.af",
    password: req.body.password || "123456789",
    joining: req.body.joining,
    address: req.body.address || "asdgfhgjk",
    status: req.body.status || "inactive",
    mobileno: req.body.mobile || "1234567789",
    role: req.body.role || "admin"
  };

  axios
    .post(`${baseURL}:8000/team/add-member`, userData)
    .then(response => {
      console.log(response.status);
      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log("Register request received in node");
  console.log("Name: " + userData.first_name);
});

users.post("/update-member", (req, res) => {
  const today = new Date();
  const userData = {
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    gender: req.body.gender,
    email: req.body.email,
    address: req.body.address,
    status: req.body.status,
    mobileno: req.body.mobile,
    role: req.body.role 
  };

  axios
    .put(`${baseURL}:8000/team/update-team-member`, userData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response.status);
      res.status(response.status).send(response.data);
      console.log(response)
    })
    .catch(e => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log("Upadate memeber request received in node");
  console.log("Name: " + userData.firstname);
});

users.post("/login", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  console.log("xxcvjk")
  axios
    .post(`${baseURL}:8000/team/login`, userData)
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log("ERROR")
      console.log(e);
      if(!e.response) return console.log(e)
      switch (e.response.status) {
        case 401:
          return res.status(401).send(e.response.data);
        default:
          return res.status(401).send(e.response.data);
      }
      res.status(500).send("Error: " + e);
    });
});

users.put("/password", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  console.log("Password change request Received!");

  axios
    .put(`${baseURL}:8000/team/update-member/password`, userData,{
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    }
    )
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)
    });
});

users.put("/updateTeamRole", (req, res) => {
  const userData = {
    teamid: req.body.teamid,
    role: req.body.role
  };
  console.log("Role change request Received!");

  axios
    .put(`${baseURL}:8000/team/update-member/role`, userData,{
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    }
    )
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)
    });
});

users.get("/view-member", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  // console.log(req.headers.token)

  axios
    .get(`${baseURL}:8000/team/view-member`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response.status);
      res.status(response.status).send(response.data);
    })
    .catch(e => res.status(500).send("Error: " + e));
});

users.get("/team-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/team/list?page=${req.query.page}&limit=${10}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response.headers)
      // console.log("response header is " + response.headers)
      res.setHeader("total-count",`${response.headers['total-count']}`)
      res.setHeader("hellp", "5")
      console.log(res)
      // res.setHeader("total-count",response.headers['total-pages'])
      console.log(response.headers['total-count'])
      console.log("hey")
      // console.log(response.headers.total-co  unt)
      // res.status(response.status).send(response.data);
      res.status(response.status).send(JSON.stringify({data:{...response.data},count: response.headers['total-count']}))
      // res.status(response.status).send(response.headers);
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)}
      
      );
});

users.get("/search", (req, res) => {
  // console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/team/list?teamid=${req.query.id}&firstname=${req.query.firstname}&lastname=${req.query.lastname}&email=${req.query.email}&joining=${req.query.joining}&status=${req.query.status}&role=${req.query.role}&mobileno=${req.query.mobileno}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

users.get("/searchTeamHasRole", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/team/has-role/view?status=${req.query.status}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

users.get("/profile", (req, res) => {});

users.post("/update", (req, res) => {
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
  };

  request.post(`${baseURL}:8000/api/users/update-profile`, userData, function(
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });

  console.log("Update Profile request received in node");
  console.log("Name: " + userData.first_name);
});

users.get("/team-has-role-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/team/has-role/view?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(" dfdfvfsd" +response)
      res.setHeader("total-count",`${response.headers['total-count']}`)
      res.setHeader("hellp", "5")
      res.status(response.status).send(JSON.stringify({data:{...response.data},count: response.headers['total-count']}))
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)}
      
      );
});

users.get("/partner-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/partner/list?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)

      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)}
      
      );
});

users.get("/search-partner", (req, res) => {
  // console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/partner/list?partnerid=${req.query.partnerid}&firstname=${req.query.firstname}&lastname=${req.query.lastname}&middlename=${req.query.middlename}&partner_email=${req.query.partner_email}&partner_mobileno=${req.query.partner_mobileno}&partner_alternate_mobileno=${req.query.partner_alternate_mobileno}&partner_address=${req.query.partner_address}&pincode=${req.query.pincode}&latitude=${req.query.latitude}&longitude=${req.query.longitude}&per_visit_price_commission=${req.query.per_visit_price_commission}&commission_type=${req.query.commission_type}&Onboard_Date=${req.query.Onboard_Date}&UpdatedAt=${req.query.UpdatedAt}&CreatedAt=${req.query.CreatedAt}&Updated_By=${req.query.Updated_By}&Created_By=${req.query.Created_By}&Partner_Gender=${req.query.Partner_Gender}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});


module.exports = users;



