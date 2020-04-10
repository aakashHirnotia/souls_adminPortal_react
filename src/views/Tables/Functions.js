import axios from "axios";

// const baseURL = "http://10.42.0.1";
const baseURL = "http://localhost";

// // process.env.MODE == "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

// //customerList
// export const customerList = async () => {
//   let data;
//   await axios
//     .get(`${baseURL}:5000/users/customer-list`, {
//       headers: {
//         token: localStorage.getItem("token")
//       }
//     })
//     .then(response => {
//       if (response.status === 200) {
//         data = [...response.data];
//       }
//     })
//     .catch(err => {
//       window.alert("Error: " + err);
//     });
//   return data;
// };

// //pandingOrderList
// export const PandingOrderList = async () => {
//     let data;
//     await axios
//       .get(`${baseURL}:5000/users/pandingorder-list`, {
//         headers: {
//           token: localStorage.getItem("token")
//         }
//       })
//       .then(response => {
//         if (response.status === 200) {
//           data = [...response.data];
//         }
//       })
//       .catch(err => {
//         window.alert("Error: " + err);
//       });
//     return data;
//   };



export const partnerList = async (activePage, itemCountPerPage) => {
    let data;
    await axios
      .get(`${baseURL}:5000/users/partner-list?page=${activePage}&limit=${itemCountPerPage}`, {
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

  export const searchPartner = async (searchUser) => {
    let data = []
    await axios.
      get(`http://localhost:5000/users/search-partner?partnerid=${searchUser.partnerid}&firstname=${searchUser.firstname}&lastname=${searchUser.lastname}&middlename=${searchUser.middlename}&partner_email=${searchUser.partner_email}&partner_mobileno=${searchUser.partner_mobileno}&partner_alternate_mobileno=${searchUser.partner_alternate_mobileno}&partner_address=${searchUser.partner_address}&pincode=${searchUser.pincode}&latitude=${searchUser.latitude}&longitude=${searchUser.longitude}&per_visit_price_commission=${searchUser.per_visit_price_commission}&commission_type=${searchUser.commission_type}&Onboard_Date=${searchUser.Onboard_Date}&UpdatedAt=${searchUser.UpdatedAt}&CreatedAt=${searchUser.CreatedAt}&Updated_By=${searchUser.Updated_By}&Created_By=${searchUser.Created_By}&Partner_Gender=${searchUser.Partner_Gender}`,{
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