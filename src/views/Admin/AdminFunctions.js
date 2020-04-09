import axios from 'axios';

// const baseURL = "http://10.42.0.69";
const baseURL = "http://localhost";

export const teamHasRoleList = async (activePage, itemCountPerPage) => {
    let data;
    await axios
      .get(`${baseURL}:5000/users/team-has-role-list?page=${activePage}&limit=${itemCountPerPage}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(typeof(response.data))
          data = [...response.data];
          // console.log(data)
          // console.log(response.headers)
          // return response.data
        }
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
    return data;
  };

  export const searchTeamHasRole = async (searchUser) => {
    let data = []
    await axios.
      get(`http://localhost:5000/users/team-has-role-list?status=${searchUser.status}`,{
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        data = [...response.data];
        // console.log(response)
      })
      .catch((e) => console.log(e));
    
    return data
  };

  export const updateRole = async (user) => {
    let changed = false;
    await axios
      .put(`${baseURL}:5000/users/updateTeamRole`, {
        teamid: user.teamid,
        role: user.role,
      },{
        headers: {
          token: localStorage.getItem("token"),
        }}
      )
      .then((response) => {
        if (response.status == 200) {
          changed= true;
        } else changed= false;
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
      return changed
  };