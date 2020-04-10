import axios from "axios";

// const baseURL = "http://10.42.0.1";
const baseURL = "http://localhost";

<<<<<<< HEAD

//customerList
export const customerList = async (activePage, itemCountPerPage) => {
  let data, count;
  await axios
    .get(`${baseURL}:5000/users/customer-list?page=${activePage}&limit=${itemCountPerPage}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = Object.keys(response.data.data).map(o=>response.data.data[o]);
        count= response.data.count
        console.log("response in header = "+ response.headers)
      }
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });

    
  return {data, count};
};

//PendingOrderList
export const PendingOrderList = async (activePage, itemCountPerPage) => {
    let data, count;
    await axios
      .get(`${baseURL}:5000/users/pendingorder-list?page=${activePage}&limit=${itemCountPerPage}`, {
=======
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
>>>>>>> d15549c372ddb636a56cadb279b9ad31f8de258c
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
<<<<<<< HEAD
          data = Object.keys(response.data.data).map(o=>response.data.data[o]);
          count= response.data.count
          console.log("response in header = "+ response.headers)
=======
          // console.log(typeof(response.data))
          data = [...response.data];
          // console.log(data)
          // console.log(response.headers)
          // return response.data
>>>>>>> d15549c372ddb636a56cadb279b9ad31f8de258c
        }
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
<<<<<<< HEAD
    return {data, count};
  };

//Transaction List
export const TransactionList = async (activePage, itemCountPerPage) => {
  let data, count;
  await axios
    .get(`${baseURL}:5000/users/transaction-list?page=${activePage}&limit=${itemCountPerPage}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = Object.keys(response.data.data).map(o=>response.data.data[o]);
        count= response.data.count
        console.log("response in header = "+ response.headers)
      }
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });
  return {data, count};
};

//Customer search
export const searchCust = async (searchCustomer) => {
  let data = []
  await axios.
    get(`http://localhost:5000/users/customer-search?customer_souls_id=${searchCustomer.customer_souls_id}&customer_name=${searchCustomer.customer_name}&mobileno=${searchCustomer.mobileno}&customer_gender=${searchCustomer.customer_gender}&customer_email=${searchCustomer.customer_email}&pincode=${searchCustomer.pincode}&createtime=${searchCustomer.createtime}&status=${searchCustomer.status}`,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response) => {
      data = [...response.data];
    })
    .catch((e) => console.log(e));
  
  return data
};

  //PendingOrder search
export const searchPendingOrder = async (searchPending) => {
  let data = []
  await axios.
    get(`http://localhost:5000/users/pandingorder-search?customer_souls_id=${searchPending.customer_souls_id}&customer_name=${searchPending.customer_name}&Slot_Time=${searchPending.Slot_Time}&Slot_Date=${searchPending.Slot_Date}&massage_duration=${searchPending.massage_duration}&pincode=${searchPending.pincode}&CreatedAt=${searchPending.CreatedAt}&is_order_confirmed=${searchPending.is_order_confirmed}&merchant_transaction_id=${searchPending.merchant_transaction_id}&total_order_amount=${searchPending.total_order_amount}`,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response) => {
      data = [...response.data];
    })
    .catch((e) => console.log(e));
  
  return data
};

 //Transaction search
export const searchTransaction = async (searchTrans) => {
  let data = []
  await axios.
    get(`http://localhost:5000/users/transaction-search?customer_souls_id=${searchTrans.customer_souls_id}&customer_name=${searchTrans.customer_name}&merchant_transaction_id=${searchTrans.merchant_transaction_id}&total_order_amount=${searchTrans.total_order_amount}&Slot_Time=${searchTrans.Slot_Time}&Slot_Date=${searchTrans.Slot_Date}&massage_duration=${searchTrans.massage_duration}&pincode=${searchTrans.pincode}&CreatedAt=${searchTrans.CreatedAt}&payment_gateway_mode=${searchTrans.payment_gateway_mode}&transaction_mode=${searchTrans.transaction_mode}&bank_type=${searchTrans.bank_type}&payment_gateway_id=${searchTrans.payment_gateway_id}`,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then((response) => {
      data = [...response.data];
    })
    .catch((e) => console.log(e));
  
  return data
};
=======
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
>>>>>>> d15549c372ddb636a56cadb279b9ad31f8de258c
