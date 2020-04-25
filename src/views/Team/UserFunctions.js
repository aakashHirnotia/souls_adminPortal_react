import axios from "axios";
import { store } from "react-notifications-component";

export const displayNotification = (title, message, type) => {
  store.addNotification({
    title: title || "",
    message: message || "",
    type: type || "success", // success //danger // info //default //warning
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
  console.log("gel");
};

const baseURL = "http://3.6.243.136";
// const baseURL = "http://localhost";

// process.env.MODE == "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

export const register = (newUser) => {
  console.log("axios worked");
  console.log("date: " + newUser.joining)
  return axios
    .post(
      `${baseURL}:5000/users/register`,
      {
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
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("Created");
        displayNotification("Success", "Team Member Created", "success");
      }
    })
    .catch((e) =>
      displayNotification("Error", "Internal Server Error", "danger")
    );
    
};

// export const search = async (searchUser) => {
//   let data = [];
//   await axios
//     .get(
//       `http://localhost:5000/users/search?id=${searchUser.id}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}&email=${searchUser.email}&joining=${searchUser.joining}&status=${searchUser.status}&role=${searchUser.role}&mobileno=${searchUser.mobileno}`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((response) => {
//       data = [...response.data];
//       // console.log(response)
//     })
//     .catch((e) => console.log(e));

//   return data;
// };

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
      if (response.status === 200) {
        console.log("Updated");
        displayNotification("Success", "Member Details Updated", "success");
      }
      // console.log(response)
    })
    .catch((e) => {
      displayNotification("Error", "Internal Server Error", "danger");
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
// fetchUserPic(token, this.fetchedUserPic)
export const fetchUserPic = (token, cb) => {
  
  return axios
    .get(`http://3.6.243.136:8000/team/fetch/image`, {
      headers: {
        token: token,
      },
    })
    .then((response) => {
      // console.log("respomse data is ----");
      // console.log(response.data)
      console.log("Fetched Profile Pic");
      cb(response, undefined);
    });
};

export const fetchTeamDetails = async (token) => {
  let data = {};
  await axios
    .get(`${baseURL}:5000/users/view-member`, {
      headers: {
        token: token,
      },
    })
    .then((response) => {
      // console.log(response.data);
      if (response.status === 200) {
        console.log("Entered");
        console.log(response.data);
        data["firstname"] = response.data["firstname"];
        data["role"] = response.data["role"];
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
  return data;
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
  console.log(`Sending Pic to Node http://localhost:5000/users/upload/image`)
  console.log(formData.get("myfile"));
  console.log(formData);
  return axios
    .post(`${baseURL}:5000/users/upload/image`, formData, {
      //directly send to go server
      headers: {
        token: localStorage.getItem("token"),
        "content-type": "multipart/form-data",
      },
    })
    .then((response) =>{
      console.log("check response");
      console.log(response);
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
        displayNotification(
          "Error",
          "Unable to connect to server :(",
          "danger"
        );
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
      displayNotification("Error", "Internal Server Error", "danger");
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
      displayNotification("Error", "Internal Server Error", "danger");
    });
  return { data, count };
};
