import axios from "axios";

// const baseURL = "http://10.42.0.69";
const baseURL = "http://localhost";

// process.env.MODE == "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

export const register = (newUser) => {
  console.log("axios worked");
  return axios
    .post(`${baseURL}:5000/users/register`, {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      gender: newUser.gender,
      email: newUser.email,
      password: newUser.password,
      joining: newUser.joining,
      address: newUser.address,
      status: newUser.status,
      role: newUser.role,
      mobile: newUser.mobile,
    })
    .then((response) => {
      console.log("Registerd");
      // console.log(response)
    })
    .catch((e) => console.log(e));
};

export const search = async (searchUser) => {
  let data = [];
  await axios
    .get(
      `http://localhost:5000/users/search?id=${searchUser.id}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}&email=${searchUser.email}&joining=${searchUser.joining}&status=${searchUser.status}&role=${searchUser.role}&mobileno=${searchUser.mobileno}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      data = [...response.data];
      // console.log(response)
    })
    .catch((e) => console.log(e));

  return data;
};

export const updateMember = (updatedUser) => {
  console.log("axios updated User worked");
  // console.log(url)
  return axios
    .post(
      `${baseURL}:5000/users/update-member`,
      {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        gender: updatedUser.gender || "M",
        address: updatedUser.address,
        email: updatedUser.email,
        status: updatedUser.status,
        role: updatedUser.role,
        mobile: updatedUser.mobile,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if (response.status === 200) console.log("Updated");
      // console.log(response)
    })
    .catch((e) => {
      window.alert("Error: " + e);
    });
};

export const fetchUserDetails = (token, cb) => {
  return axios
    .get(`${baseURL}:5000/users/profile`, {
      headers: {
        token: token,
      },
    })
    .then((response) => {
      console.log("respomse data is ----");
      // console.log(response.data)
      console.log("Fetching data");
      cb(response.data, undefined);
    });
};

export const fetchTeamDetails = (token) => {
  return axios
    .get(`${baseURL}:5000/users/view-member`, {
      headers: {
        token: token,
      },
    })
    .then((response) => {
      // console.log(response.data);
      if (response.status === 200) {
        console.log("Entered");
      } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    })
    .catch((e) => {
      console.log("Error" + e);
      window.location.href = "/login";
      // res.status(500).send(e)
      // console.log("error")
    });
};

export const update = (updatedUser) => {
  return axios
    .put(
      `${baseURL}:5000/users/update`,
      {
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        Joining_Date: updatedUser.Joining_Date,
        address: updatedUser.address,
        status: updatedUser.status,
        role: updatedUser.role,
        mobileno: updatedUser.mobileno,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      // console.log("aakash")
      localStorage.removeItem("usertoken");
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfilePic = (formData) => {
  console.log("In userFucntions React---");
  console.log(formData.get("myImage"));
  console.log(formData);
  return axios
    .post(`${baseURL}:8000/update/profilePic`, formData, {
      //directly send to go server
      headers: {
        token: localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (user) => {
  let message = "";
  console.log("aakash");
  await axios
    .post(`${baseURL}:5000/users/login`, {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      // console.log(response)
      switch (response.status) {
        case 200: {
          localStorage.setItem("token", response.data.token);
          window.location.href = "/dashboard";
          message = "";
          return;
        }
        case 401: {
          message = "Invalid User!";
          return;
        }
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.response) {
        switch (e.response.status) {
          case 401:
            message = e.response.data.message;
            return;
          default:
            return e.response.status;
        }
      } else {
        window.alert(e);
      }
    });
  return message;
};

export const updatePassword = async (user) => {
  let changed = false;
  await axios
    .put(
      `${baseURL}:5000/users/password`,
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if (response.status == 200) {
        changed = true;
      } else changed = false;
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });
  return changed;
};

// export const logout = user => {
//   axios
//     .post('http://localhost:5000/users/logout', {
//       email: user.email,
//       password: user.password
//     })
//     .then(response => {
//       if(response.status === 200) {
//         localStorage.setItem('token', response.data.token)
//         window.location.href = '/dashboard'
//       }
//     })
//     .catch(err => {
//       window.alert("Error: "+err)
//     })
// }

export const teamList = async (query) => {
  let data, count;
  // let totalcount;
  await axios
    .get(
      `${baseURL}:5000/users/team-list?page=${query.page || ""}&limit=${
        query.limit || ""
      }&teamid=${query.teamid || ""}&firstname=${
        query.firstname || ""
      }&lastname=${query.lastname || ""}&email=${query.email || ""}&joining=${
        query.joining || ""
      }&status=${query.status || ""}&role=${query.role || ""}&mobileno=${
        query.mobileno || ""
      }`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        data = Object.keys(response.data.data).map(
          (o) => response.data.data[o]
        );
        count = response.data.count;
        console.log("count: " + count);
      }
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });
  return { data, count };
};
