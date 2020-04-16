const express = require("express");
const users = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
users.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://10.38.1.35";

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
    role: req.body.role || "admin",
    gender: req.body.gender,
  };
  console.log(userData.firstname);
  axios
    .post(`${baseURL}:8000/team/add-member`, userData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      console.log(response);
      res.status(response.status).send(response.data);
    })
    .catch((e) => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log("Register request received in node");
  console.log("Name: " + userData.firstname + " address:" + userData.joining);
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
    role: req.body.role,
  };

  axios
    .put(`${baseURL}:8000/team/update/team-member`, userData, {
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
  console.log("Upadate memeber request received in node");
  console.log("Name: " + userData.firstname);
});

users.post("/login", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  axios
    .post(`${baseURL}:8000/team/login`, userData)
    .then((response) => {
      // console.log(response)
      res.status(response.status).send(response.data);
    })
    .catch((e) => {
      console.log("ERROR");
      console.log(e);
      if (!e.response) return console.log(e);
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
    password: req.body.password,
  };
  console.log("Password change request Received!");

  axios
    .put(`${baseURL}:8000/team/update-member/password`, userData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      console.log(response);
      res.status(response.status).send(response.data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error: " + e);
    });
});

users.get("/view-member", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  axios
    .get(`${baseURL}:8000/team/view-member`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      console.log("view-member = ");
      console.log(response.data);
      res.status(response.status).send(response.data);
      // console.log(response.data)
    })
    .catch((e) => res.status(500).send("Error: " + e));
});

users.get("/profile", (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  axios
    .get(`${baseURL}:8000/team/view-member`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      // console.log(response)
      console.log("profile resposne received ! response.data = ");
      console.log(response.data);
      res.status(response.status).send(response.data);
    })
    .catch((e) => {
      console.log("ERROR:" + e);
      res.status(500).send("Error: " + e);
    });
});

//Team List
users.get("/team-list", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(
      `${baseURL}:8000/team/list?page=${req.query.page}&limit=${req.query.limit}&teamid=${req.query.teamid}&firstname=${req.query.firstname}&lastname=${req.query.lastname}&email=${req.query.email}&joining=${req.query.joining}&status=${req.query.status}&role=${req.query.role}&mobileno=${req.query.mobileno}`,
      {
        headers: {
          Authorization: `Bearer ${req.headers.token}`,
        },
      }
    )
    .then((response) => {
      // console.log(response);
      res.status(response.status).send({
        data: { ...response.data },
        count: response.headers["total-count"],
      });
      // res.status(response.status).send(response.headers);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error: " + e);
    });
});

//Customer List
users.get("/customer-list", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(`${baseURL}:8000/customers/list?page=${req.query.page}&limit=${10}`, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
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
    .catch((e) => {
      console.log(e);
      res.status(500).send(e);
    });
});

//Pending Order List
users.get("/pendingorder-list", (req, res) => {
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

//transaction List
users.get("/transaction-list", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(
      `${baseURL}:8000/customers/transaction/list?page=${
        req.query.page
      }&limit=${5}`,
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

//Assign Partner List
users.get("/assign-partner-list", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(
      `${baseURL}:8000/assign/partner/list?page=${req.query.page}&limit=${5}`,
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

//Team Search
users.get("/search", (req, res) => {
  console.log("request Recieved for filter in node");
  axios
    .get(
      `${baseURL}:8000/team/list?teamid=${req.query.id}&firstname=${req.query.firstname}&lastname=${req.query.lastname}&email=${req.query.email}&joining=${req.query.joining}&status=${req.query.status}&role=${req.query.role}&mobileno=${req.query.mobileno}`,
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

//customer search
users.get("/customer-search", (req, res) => {
  console.log("request Recieved for filter in node (customer search)");
  axios
    .get(
      `${baseURL}:8000/customers/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&customer_mobile_no=${req.query.customer_mobile_no}&customer_gender=${req.query.customer_gender}&customer_email=${req.query.customer_email}&pincode=${req.query.pincode}&createtime=${req.query.createtime}&status=${req.query.status}`,
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

//PendingOrder search
users.get("/pendingorder-search", (req, res) => {
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

//Transaction search
users.get("/transaction-search", (req, res) => {
  console.log("request Recieved for filter in node");
  axios
    .get(
      `${baseURL}:8000/customers/transaction/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&merchant_transaction_id=${req.query.merchant_transaction_id}&total_order_amount=${req.query.total_order_amount}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&massage_duration=${req.query.massage_duration}&pincode=${req.query.pincode}&CreatedAt=${req.query.CreatedAt}&payment_gateway_mode=${req.query.payment_gateway_mode}&transaction_mode=${req.query.transaction_mode}&bank_type=${req.query.bank_type}&payment_gateway_id=${req.query.payment_gateway_id}`,
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

//Assign Partner search
users.get("/assign-partner-search", (req, res) => {
  console.log("request Recieved for filter in node");
  axios
    .get(
      `${baseURL}:8000/assign/partner/list?customer_souls_id=${req.query.customer_souls_id}&customer_name=${req.query.customer_name}&Slot_Time=${req.query.Slot_Time}&Slot_Date=${req.query.Slot_Date}&partner_souls_id=${req.query.partner_souls_id}&partner_name=${req.query.partner_name}&partner_mobileno=${req.query.partner_mobileno}&CreatedAt=${req.query.CreatedAt}&status=${req.query.status}`,
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
    registrated_source: req.body.registrated_source,
    status: req.body.status,
  };
  axios
    .put(`${baseURL}:8000/customers/update`, userData, {
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
    total_order_amount: req.body.total_order_amount,
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

//Assign Member Update
users.put("/update-assign-partner", (req, res) => {
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

users.put("/update", (req, res) => {
  // const today = new Date()
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    // email: req.body.email,
    // Joining_Date: req.body.Joining_Date,
    address: req.body.address,
    status: req.body.status,
    // role: req.body.role,
    mobileno: req.body.mobileno,
  };
  console.log("aKash");
  axios
    .put(`${baseURL}:8000/team/update/profile`, userData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      res.status(response.status).send(response.data);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error: " + e);
    });

  console.log("Update Profile request received in node");
  console.log("Name: " + userData.firstname);
});

// const uploads = multer({
//    storage: storage,
//    limits:{fileSize: 1000000},
// }).single("myImage");

// // const router = express.Router();
// users.post("/update/profilePic", (req,res)=> {
//    uploads(req, res, (err) => {
//       console.log("Request ---", req.body);
//       console.log("Request file ---", req.file);//Here you get file.
//       /*Now do where ever you want to do*/
//       if(!err)
//          return res.send(200).end();
//    })
// })

// users.post("/update/profilePic", (req, res) => {
//   console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
//   // console.log(req)
//   console.log("Request file ---", req.body)
//   console.log(req.body)
//   // console.log(req)
//   axios
//     .put(`${baseURL}:8000/team/update/profilePic`, req.file,{
//       headers: {
//         Authorization: `Bearer ${req.headers.token}`,
//         'content-type':`${req.headers['content-type']}`
//       }
//     }
//     )
//     // .then(response => {
//     //   console.log(response.data)
//     //   res.status(response.status).send(response.data);
//     // })
//     .catch(e => {
//       // console.log(e)
//       res.status(500).send("Error: " + e)
//     });

//   console.log("Update Profile Pic request received in node");
//   // console.log("File: " + req.file);
// });

users.put("/updateTeamRole", (req, res) => {
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

users.get("/searchTeamHasRole", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  console.log("request Recieved for filter in node");
  axios
    .get(
      `${baseURL}:8000/team/has-role/list?status=${req.query.status}&firstname=${req.query.firstname}&lastname=${req.query.lastname}`,
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

users.get("/team-has-role-list", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(
      `${baseURL}:8000/team/has-role/list?page=${req.query.page}&limit=${5}`,
      {
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

users.get("/partner-list", (req, res) => {
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

users.get("/search-partner", (req, res) => {
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
users.post("/registerPartner", (req, res) => {
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
users.put("/update-partner", (req, res) => {
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

//Souls Settings List
users.get("/soulsSettings", (req, res) => {
  // console.log("pagination request received in node, page is " + req.query.page + " and countsPerPage is 5");
  // console.log("aakash")
  axios
    .get(`${baseURL}:8000/souls/settings/list`, {
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
users.put("/updateSettings", (req, res) => {
  const today = new Date();
  const settingsData = {
    souls_setting_id: req.body.souls_setting_id,
    url: req.body.url,
    description: req.body.description,
    hostname: req.body.hostname,
    username: req.body.username,
    password: req.body.password,
  };

  axios
    .put(`${baseURL}:8000/souls/settings/update`, settingsData, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      console.log(response.status);
      res.status(response.status).send(response.data);
      // console.log(response)
    })
    .catch((e) => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log("Upadate memeber request received in node");
  // console.log("Name: " + settingsData.username);
});


//communication tempelate list
users.get("/communicationTempelateList", (req, res) => {
  console.log(
    "pagination request received in node, page is " +
      req.query.page +
      " and countsPerPage is 5"
  );
  axios
    .get(
      `${baseURL}:8000/communication/template/list?page=${
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
users.get("/searchCommTempelate", (req, res) => {
  console.log("request Recieved for filter in node");
  axios
    .get(
      `${baseURL}:8000/communication/template/list?templ_type=${req.query.templ_type}&trigger_time=${req.query.trigger_time}&trigger_for=${req.query.trigger_for}&sms_content=${req.query.sms_content}&subject=${req.query.subject}&email_content=${req.query.email_content}&status=${req.query.status}`,
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
users.post("/createCommTempelate", (req, res) => {
  const today = new Date();
  const Data = {
    templ_type: req.body.type,
    trigger_time: req.body.trigger_time,
    trigger_for: req.body.trigger_for,
    sms_content: req.body.smsContent,
    subject: req.body.subject,
    email_content: req.body.emailContent,
    status: req.body.status,
  };

  axios
    .post(`${baseURL}:8000/communication/template/create`, Data, {
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
users.put("/updateCommTempelate", (req, res) => {
  const today = new Date();
  const Data = {
    templ_type: req.body.type,
    trigger_time: req.body.trigger_time,
    trigger_for: req.body.trigger_for,
    sms_content: req.body.smsContent,
    subject: req.body.subject,
    email_content: req.body.emailContent,
    status: req.body.status,
  };

  axios
    .put(`${baseURL}:8000/communication/template/update`, Data, {
      headers: {
        Authorization: `Bearer ${req.headers.token}`,
      },
    })
    .then((response) => {
      // console.log(response.status
      res.status(response.status).send(response.data);

    })
    .catch((e) => {
      console.log("ERROR");
      console.log(e);
      res.status(500).send(e);
    });
  console.log("Upadate memeber request received in node");
});

module.exports = users;
