import axios from 'axios';

// const baseURL = "http://10.42.0.69";
const baseURL = "http://localhost";

export const teamHasRoleList = async (activePage, itemCountPerPage) => {
    let data,count;
    await axios
      .get(`${baseURL}:5000/teamHasRoles/team-has-role-list?page=${activePage}&limit=${itemCountPerPage}`, {
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

  export const searchTeamHasRole = async (searchUser) => {
    let data = []
    await axios.
      get(`http://localhost:5000/teamHasRoles/searchTeamHasRole?status=${searchUser.status}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}`,{
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
  export const communicationTempelateList = async (activePage, itemCountPerPage) => {
    let data, count;
    // let totalcount;
    await axios
      .get(`${baseURL}:5000/communicationTempelates/communicationTempelateList?page=${activePage}&limit=${itemCountPerPage}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(typeof(response.data))
          
          // totalcount = [response.headers.total-count]
          // console.log(data)
          // console.log(response)
          data = Object.keys(response.data.data).map(o=>response.data.data[o])
          count = response.data.count
          console.log("count: "+ count)
          // console.log("headers in resonse is "+response.headers(["total-count"]));
          // return response.data
        }
      })
      .catch((err) => {
        window.alert("Error: " + err);
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
  
