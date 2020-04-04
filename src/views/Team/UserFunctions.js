import axios from "axios";

const baseURL =
  process.env.MODE == "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

export const register = newUser => {
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
      mobile: newUser.mobile
    })
    .then(response => {
      console.log("Registerd");
      // console.log(response)
    })
    .catch(e => console.log(e));
};

export const search = searchUser => {
  // console.log("axios worked")
  console.log("search reuested sending to node");
  return axios
    .post("http://localhost:5000/users/search", {
      id: searchUser.id,
      first_name: searchUser.first_name,
      last_name: searchUser.last_name,
      // gender: searchUser.gender,
      email: searchUser.email,
      // password: searchUser.password,
      joining: searchUser.joining,
      address: searchUser.address,
      status: searchUser.status,
      role: searchUser.role,
      mobile: searchUser.mobile
    })
    .then(response => {
      console.log("search");
      // console.log(response)
    })
    .catch(e => console.log(e));
};
export const updateMember = user => {
  console.log("axios worked");
  // console.log(url)
  return axios
    .post(
      `${baseURL}:5000/users/update-member`,
      {
        first_name: user.firstname,
        last_name: user.lastname,
        gender: user.gender || "M",
        email: user.email,
        joining: user.Joining_Date,
        address: user.address,
        status: user.status,
        role: user.role,
        mobile: user.mobile
      },
      {
        headers: {
          token: localStorage.getItem("token")
        }
      }
    )
    .then(response => {
      if (response.status === 200) console.log("Updated");
      // console.log(response)
    })
    .catch(e => {
      window.alert("Error: " + e);
    });
};

export const fetchUserDetails = token => {
  return axios
    .get(`${baseURL}:5000/users/profile`, {
      headers: {
        token: token
      }
    })
    .then(response => {
      console.log("Fetching data");
    });
};

export const fetchTeamDetails = token => {
  return axios
    .get(`${baseURL}:5000/users/view-member`, {
      headers: {
        token: token
      }
    })
    .then(response => {
      console.log(response.status);
      if (response.status === 200) {
        console.log("Entered");
      } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    })
    .catch(e => {
      console.log("Error" + e);
      window.location.href = "/logout";
      // res.status(500).send(e)
      // console.log("error")
    });
};

export const update = updatedUser => {
  return axios
    .post(`${baseURL}:5000/users/update`, {
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      gender: updatedUser.gender,
      email: updatedUser.email,
      password: updatedUser.password,
      joining: updatedUser.joining,
      address: updatedUser.address,
      status: updatedUser.status,
      role: updatedUser.role,
      mobile: updatedUser.mobile
    })
    .then(response => {
      localStorage.removeItem("usertoken");
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const login = user => {
  axios
    .post(`${baseURL}:5000/users/login`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      }
    })
    .catch(err => {
      window.alert("Error: " + err);
    });
};

export const updatePassword = async user => {
  await axios
    .post(`${baseURL}:5000/users/password`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      } else return false;
    })
    .catch(err => {
      window.alert("Error: " + err);
    });
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

export const teamList = async () => {
  let data;
  await axios
    .get(`${baseURL}:5000/users/team-list`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(response => {
      if (response.status === 200) {
        // console.log(typeof(response.data))
        data = [...response.data];
        // console.log(data)
        // console.log(response.data)
        // return response.data
      }
    })
    .catch(err => {
      window.alert("Error: " + err);
    });
  return data;
};
