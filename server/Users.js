const express = require("express");
const users = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
users.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136"

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
  // console.log("xxcvjk")
  axios
    .post(`${baseURL}:8000/team/login`, userData)
    .then(response => {
      // console.log(response)
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
      console.log("view-member = ")
      console.log(response.data);
      res.status(response.status).send(response.data);
      // console.log(response.data)
    })
    .catch(e => res.status(500).send("Error: " + e));
});


users.get("/profile", (req, res) => {
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
      // console.log(response)
      console.log("profile resposne received ! response.data = ")
      console.log(response.data);
      res.status(response.status).send(response.data);
    })
    .catch(e =>{
      console.log("ERROR:"+ e)
      res.status(500).send("Error: " + e);
    } )
});

//Team List
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
    .catch(e => res.status(500).send("Error: " + e));
});

//Customer List
users.get("/customer-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/customers/list?page=${req.query.page}&limit=${10}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log(response)
      res.setHeader("total-count",`${response.headers['total-count']}`)
      res.setHeader("help","5")
      res.status(response.status).send(JSON.stringify({data:{...response.data},count: response.headers['total-count']}));
    })
    .catch(e =>{
      console.log(e)
    res.status(500).send(e)})
})
      
  //Pending Order List
  users.get("/pendingorder-list", (req, res) => {
  console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  axios
    .get(`${baseURL}:8000/customers/booking/list?page=${req.query.page}&limit=${10}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      res.setHeader("total-count",`${response.headers['total-count']}`)
      res.setHeader("help","5")
      res.status(response.status).send(JSON.stringify({data:{...response.data},count: response.headers['total-count']}));
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
      res.setHeader("total-count",`${response.headers['total-count']}`)
      res.setHeader("help","5")
      res.status(response.status).send(JSON.stringify({data:{...response.data},count: response.headers['total-count']}));
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
    .get(`${baseURL}:8000/customers/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&mobileno=${req.query.mobileno}&customer_gender=${req.query.customer_gender}&customer_email=${req.query.customer_email}&pincode=${req.query.pincode}&createtime=${req.query.createtime}&status=${req.query.status}`, {
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
    .get(`${baseURL}:8000/customers/booking/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&CreatedAt=${req.query.CreatedAt}&is_order_confirmed=${req.query.is_order_confirmed}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}`, {
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
    .get(`${baseURL}:8000/customers/transaction/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&CreatedAt=${req.query.CreatedAt}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}`, {
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

//Customer Member Update
users.put("/update-customer", (req, res) => {
  const today = new Date();
  const userData = {
    customer_name: req.body.customer_name,
    customer_mobile_no: req.body.customer_mobile_no,
    customer_gender: req.body.customer_gender,
    customer_email: req.body.customer_email,
    customer_address: req.body.customer_address,
    pincode: req.body.pincode,
    Last_Access_Time: req.body.Last_Access_Time,
    status: req.body.status
  };
  axios
    .put(`${baseURL}:8000/team/update-customer-member`, userData, {
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
  console.log(userData.customer_name);
});

//Transaction Update
users.put("/update-transaction", (req, res) => {
  const today = new Date();
  const userData = {
    number_of_therapist: req.body.number_of_therapist,
    therapist_gender: req.body.therapist_gender,
    massage_for: req.body.massage_for,
    Slot_Time: req.body.Slot_Time,
    Slot_Date: req.body.Slot_Date,
    massage_duration: req.body.massage_duration,
    customer_address: req.body.customer_address,
    pincode: req.body.pincode,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    merchant_transaction_id: req.body.merchant_transaction_id,
    payment_gateway_mode: req.body.payment_gateway_mode,
    transaction_mode: req.body.transaction_mode,
    bank_type: req.body.bank_type,
    payment_gateway_id: req.body.payment_gateway_id,
    total_order_amount: req.body.total_order_amount
  };
  axios
    .put(`${baseURL}:8000/team/update-transaction-member`, userData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      // console.log(response.status);
      res.status(response.status).send(response.data);
      // console.log(response)
    })
    .catch(e => {
      // console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log(userData.number_of_therapist)
});


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
      // console.log(response)
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
    .get(`${baseURL}:8000/partner/List?page=${req.query.page}&limit=${5}`, {
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
    .get(`${baseURL}:8000/partner/List?partner_id=${req.query.partner_id}&partner_name=${req.query.partner_name}&partner_email=${req.query.partner_email}&partner_mobileno=${req.query.partner_mobileno}&partner_address=${req.query.partner_address}&pincode=${req.query.pincode}&latitude=${req.query.latitude}&Longitude=${req.query.Longitude}&Rate=${req.query.Rate}&Commission_Type=${req.query.Commission_Type}&Onboard_Date=${req.query.Onboard_Date}&Onboard_Date=${req.query.Onboard_Date}&UpdatedAt=${req.query.UpdatedAt}&CreatedAt=${req.query.CreatedAt}&updated_by=${req.query.updated_by}&created_by=${req.query.created_by}&partner_gender=${req.query.partner_gender}`, {
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


// register partner
users.post("/registerPartner", (req, res) => {
  const today = new Date();
  const partnerData = {
    partner_name: req.body.partner_name || "aakash",
    partner_email: req.body.partner_email || "a@jj",
    partner_mobileno: req.body.partner_mobileno || "2345678",
    partner_address: req.body.partner_address || "asdfgh",
    pincode: req.body.pincode || "234567",
    Rate: req.body.Rate || "10",
    Commission_Type: req.body.Commission_Type || "advacnce",
    partner_gender: req.body.partner_gender || "Male"
  };

  axios
    .post(`${baseURL}:8000/partner/register`, partnerData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`
      }
    })
    .then(response => {
      console.log("dfghj ------------  ")
      console.log(response.data);
      res.status(response.status).send(response.data);
    })
    .catch(e => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });

  console.log("Register request received in node");
  console.log("Name: " + partnerData.partner_name +" "+ partnerData.partner_address);
});

//update partner
users.post("/update-partner", (req, res) => {
  const today = new Date();
  const partnerData = {
    name: req.body.name || "aakash",
    email: req.body.email || "a@jj",
    mobileno: req.body.mobileno || "2345678",
    address: req.body.address || "asdfgh",
    pincode: req.body.pincode || "234567",
    rate: req.body.rate || "10",
    commission_type: req.body.commission_type || "advacnce",
    gender: req.body.gender || "Male"
  };

  axios
    .put(`${baseURL}:8000/partner/update`, partnerData, {
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
  console.log("Name: " + partnerData.name);
});


module.exports = users;
