const express = require("express");
const users = express.Router();
const cors = require("cors");
const axios = require("axios");
const request = require("request");
users.use(cors());

process.env.SECRET_KEY = "secret";
const baseURL = "http://3.6.243.136";

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

module.exports = users