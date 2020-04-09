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

  //Team Registration
  users.post("/register", (req, res) => {
    const today = new Date();
  const userData = {
    firstname: req.body.first_name || "AShish",
    lastname: req.body.last_name || "kumar",
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

//Team Member Update
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

users.get("/view-member", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  axios
    .get(`${baseURL}:8000/team/view-member`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response.status);
      res.status(response.status).send(response.data);
      console.log(response.data)
    })
    .catch(e => res.status(500).send("Error: " + e));
});

//Team List
users.get("/team-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/team/list?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(e => res.status(500).send("Error: " + e));
});

//Customer List
users.get("/customer-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/customers/list?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log(e)
    res.status(500).send("Error: " + e);
})});

//PendingOrder List
users.get("/pendingorder-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/customers/booking/list?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(e => res.status(500).send("Error: " + e));
});

//transaction List
users.get("/transaction-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/customers/transaction/list?page=${req.query.page}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch(e => res.status(500).send("Error: " + e));
});

//Team Search
users.get("/search", (req, res) => {
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/team/list?teamid=${req.query.id}&firstname=${req.query.firstname}&lastname=${req.query.lastname}&email=${req.query.email}&joining=${req.query.joining}&status=${req.query.status}&role=${req.query.role}&mobileno=${req.query.mobileno}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

//customer search
users.get("/customer-search", (req, res) => {
  console.log("request Recieved for filter in node (customer search)") 
  // console.log("status = " + req.query.status);
  axios
    .get(`${baseURL}:8000/customers/list?customer_id=${req.query.customer_id}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&mobileno=${req.query.mobileno}&customer_gender=${req.query.customer_gender}&customer_email=${req.query.customer_email}&address=${req.query.address}&pincode=${req.query.pincode}&createtime=${req.query.createtime}&registrationsource=${req.query.registrationsource}&lastaccesstime=${req.query.lastaccesstime}&status=${req.query.status}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

//PendingOrder search
users.get("/pendingorder-search", (req, res) => {
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/customers/booking/list?order_id=${req.query.order_id}&customer_id=${req.query.customer_id}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&number_of_therapist=${req.query.number_of_therapist}&therapist_gender=${req.query.therapist_gender}&massage_for=${req.query.massage_for}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&address=${req.query.address}&pincode=${req.query.pincode}&latitude=${req.query.latitude}&longitude=${req.query.longitude}&CreatedAt=${req.query.CreatedAt}&is_order_confirmed=${req.query.is_order_confirmed}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

//Transaction search
users.get("/transaction-search", (req, res) => {
  console.log("request Recieved for filter in node") 
  axios
    .get(`${baseURL}:8000/customers/transaction/list?order_id=${req.query.order_id}&customer_id=${req.query.customer_id}&customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&number_of_therapist=${req.query.number_of_therapist}&therapist_gender=${req.query.therapist_gender}&massage_for=${req.query.massage_for}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&customer_address=${req.query.customer_address}&pincode=${req.query.pincode}&latitude=${req.query.latitude}&longitude=${req.query.longitude}&CreatedAt=${req.query.CreatedAt}&merchant_transaction_id=${req.query.merchant_transaction_id}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}&total_order_amount=${req.query.total_order_amount}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
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
})

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

      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log(e)
      res.status(500).send("Error: " + e)}
      
      );
});

module.exports = users;
