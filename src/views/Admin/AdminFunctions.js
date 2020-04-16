import axios from "axios";
import { store } from "react-notifications-component";

export const displayNotification = (title, message, type) => {
  store.addNotification({
    title: title || "",
    message: message || "",
    type: type || "success", // success //danger // info //default //warning
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
  console.log("gel");
};

// const baseURL = "http://10.42.0.69";
const baseURL = "http://localhost";

export const teamHasRoleList = async (query) => {
    let data,count;
    // teamid: 0,
    //     first_name: "",
    //     last_name: "",
    //     team_has_role_id: "",
    //     status: "",
    //     CreatedAt: "",
    //     UpdatedAt: ""
    await axios
      // .get(`${baseURL}:5000/teamHasRoles/team-has-role-list?page=${activePage}&limit=${itemCountPerPage}`, {
      .get(
        `${baseURL}:5000/teamHasRoles/team-has-role-list?page=${query.page || ""}&limit=${
          query.limit || ""
        }&teamid=${query.teamid || ""}&firstname=${
          query.firstname || ""
        }&lastname=${query.lastname || ""}&teamhasroleid=${query.team_has_role_id || ""}&status=${query.status || ""
        }&createdat=${query.CreatedAt || ""
        }&updatedat=${query.UpdatedAt || ""}`,
      {  
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          data = Object.keys(response.data.data).map(o=>response.data.data[o])
          count = response.data.count
          // console.log(data)
          // console.log(response.headers)
          // return response.data
        }
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
    return {data, count};
  };

  // export const searchTeamHasRole = async (searchUser) => {
  //   let data = []
  //   await axios.
  //     get(`${baseURL}:5000/teamHasRoles/searchTeamHasRole?status=${searchUser.status}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}`,{
  //       headers: {
  //         token: localStorage.getItem("token")
  //       }
  //     })
  //     .then((response) => {
  //       data = [...response.data];
  //       // console.log(response)
  //     })
  //     .catch((e) => console.log(e));
    
  //   return data
  // };

  export const updateRole = async (user) => {
    let changed = false;
    console.log("hiiiiiii")
    await axios
      .put(`${baseURL}:5000/teamHasRoles/updateTeamRole`, {
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


  // souls settings list
  export const soulsSettingsList = async () => {
    let data;
    console.log("aakash")
    await axios
      .get(`${baseURL}:5000/SOULS_Settings/soulsSettings`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // data = Object.keys(response.data.data).map(o=>response.data.data[o])
          // count = response.data.count
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

  //update souls settings
  export const updateSettings = async (user) => {
    let changed = false;
    console.log("hiiiiiii")
    await axios
      .put(`${baseURL}:5000/SOULS_Settings/updateSettings`, {
        soulsSettingsID: user.soulsSettingsID,
        url: user.url,
        description: user.description,
        hostname: user.hostname,
        username: user.username,
        password: user.password
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

  //Communication Tempelate list
  export const communicationTempelateList = async (query) => {
    let data, count;
    // let totalcount;
    await axios
      .get(
        `${baseURL}:5000/communicationTempelates/communicationTempelateList?page=${query.page || ""}&limit=${
          query.limit || ""
        }&communicationTempelateID=${query.communicationTempelateID || ""}&type=${
          query.type || ""
        }&trigger_time=${query.trigger_time || ""}&trigger_for=${query.trigger_for || ""}&smsContent=${
          query.smsContent || ""
        }&subject=${query.subject || ""}&emailContent=${query.emailContent || ""}&status=${
          query.status || ""
        }`,
      
      // .get(`${baseURL}:5000/communicationTempelates/communicationTempelateList?page=${activePage}&limit=${itemCountPerPage}`, {
      {  
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          data = Object.keys(response.data.data).map(o=>response.data.data[o])
          count = response.data.count
          console.log("count: "+ count)
        }
      })
      .catch((err) => {
        displayNotification("Error", "Internal Server Error", "danger");
      });
    return {data, count};
  };
  
  //search coummunication tempelate
  export const searchCommunicationTempelate = async (searchCommTempelate) => {
    let data = []
    await axios.
      get(`http://localhost:5000/communicationTempelates/searchCommTempelate?communicationTempelateID=${searchCommTempelate.communicationTempelateID}&type=${searchCommTempelate.type}&trigger_time=${searchCommTempelate.trigger_time}&trigger_for=${searchCommTempelate.trigger_for}&smsContent=${searchCommTempelate.smsContent}&subject=${searchCommTempelate.subject}&emailContent=${searchCommTempelate.emailContent}&status=${searchCommTempelate.status}`,{
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
  
  // create comm temepalte
  export const createCommTempelate = (newCommTempelate) => {
    return axios
      .post(`${baseURL}:5000/communicationTempelates/createCommTempelate`, {
        type: newCommTempelate.type,
        trigger_time: newCommTempelate.trigger_time,
        trigger_for: newCommTempelate.trigger_for,
        smsContent: newCommTempelate.smsContent,
        subject: newCommTempelate.subject,
        emailContent: newCommTempelate.emailContent,
        status: newCommTempelate.status  
      }, {headers:{token:localStorage.getItem('token')}})
      .then((response) => {
        console.log("tempelate created");
        // console.log(response)
      })
      .catch((e) => console.log(e));
  };
  
  export const updateCommTempelate = updatedCommTempelate => {
    console.log("axios updated User worked");
    // console.log(url)
    return axios
      .put(
        `${baseURL}:5000/communicationTempelates/updateCommTempelate`,
        {
          type: updatedCommTempelate.type,
          trigger_time: updatedCommTempelate.trigger_time,
          trigger_for: updatedCommTempelate.trigger_for,
          smsContent: updatedCommTempelate.smsContent,
          subject: updatedCommTempelate.subject,
          emailContent: updatedCommTempelate.emailContent,
          status: updatedCommTempelate.status
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
  
