// import axios from "axios";

// // const baseURL = "http://10.42.0.1";
// const baseURL = "http://localhost";

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