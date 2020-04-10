import axios from "axios";

// const baseURL = "http://10.42.0.1";
const baseURL = "http://localhost";


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