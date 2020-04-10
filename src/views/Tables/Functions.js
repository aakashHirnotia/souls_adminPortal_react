import axios from "axios";

// const baseURL = "http://10.42.0.1";
const baseURL = "http://localhost";

export const registerPartner = (newPartner) => {
  console.log("axios worked");
  return axios
    .post(`${baseURL}:5000/users/registerPartner`, {
      partner_name: newPartner.partner_name,
      partner_email: newPartner.partner_email,
      partner_mobileno: newPartner.partner_mobileno,
      partner_address: newPartner.partner_address,
      pincode: newPartner.pincode,
      Rate: newPartner.Rate,
      Commission_Type: newPartner.Commission_Type,
      partner_gender: newPartner.partner_gender
    }, {headers:{token:localStorage.getItem('token')}})
    .then((response) => {
      console.log("Partner Registerd");
      // console.log(response)
    })
    .catch((e) => console.log(e));
};

export const updatePartner = updatedPartner => {
  console.log("axios updated User worked");
  // console.log(url)
  return axios
    .put(
      `${baseURL}:5000/users/update-partner`,
      {
        name: updatedPartner.name,
        email: updatedPartner.email,
        mobileno: updatedPartner.mobileno,
        address: updatedPartner.address,
        pincode: updatedPartner.pincode,
        rate: updatedPartner.rate,
        commission_type: updatedPartner.commission_type,
        gender: updatedPartner.gender
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
      get(`http://localhost:5000/users/search-partner?partner_id=${searchUser.partner_id}&partner_name=${searchUser.partner_name}&partner_email=${searchUser.partner_email}&partner_mobileno=${searchUser.partner_mobileno}&partner_address=${searchUser.partner_address}&pincode=${searchUser.pincode}&latitude=${searchUser.latitude}&Longitude=${searchUser.Longitude}&Rate=${searchUser.Rate}&Commission_Type=${searchUser.Commission_Type}&Onboard_Date=${searchUser.Onboard_Date}&Onboard_Date=${searchUser.Onboard_Date}&UpdatedAt=${searchUser.UpdatedAt}&CreatedAt=${searchUser.CreatedAt}&updated_by=${searchUser.updated_by}&created_by=${searchUser.created_by}&partner_gender=${searchUser.partner_gender}`,{
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