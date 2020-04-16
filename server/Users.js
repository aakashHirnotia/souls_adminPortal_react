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


//Souls Settings List
users.get("/soulsSettings", (req, res) => {
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
users.put("/updateSettings", (req, res) => {
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

//communication tempelate list
users.get("/communicationTempelateList", (req, res) => {
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
users.get("/searchCommTempelate", (req, res) => {
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
users.post("/createCommTempelate", (req, res) => {
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
users.put("/updateCommTempelate", (req, res) => {
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

module.exports = users;
