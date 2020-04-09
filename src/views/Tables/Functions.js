import axios from "axios";

// const baseURL = "http://10.42.0.1";
const baseURL = "http://localhost";

// process.env.MODE == "SHARED_SERVER" ? "10.42.0.1" : "http://localhost";

//customerList
export const customerList = async (activePage, itemCountPerPage) => {
  let data;
  await axios
    .get(`${baseURL}:5000/users/customer-list?page=${activePage}&limit=${itemCountPerPage}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = [...response.data];
        // console.log(data)
      }
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });
  return data;
};

//PendingOrderList
export const PendingOrderList = async (activePage, itemCountPerPage) => {
    let data;
    await axios
      .get(`${baseURL}:5000/users/pendingorder-list?page=${activePage}&limit=${itemCountPerPage}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          data = [...response.data];
        }
      })
      .catch((err) => {
        window.alert("Error: " + err);
      });
    return data;
  };

//Transaction List
export const TransactionList = async (activePage, itemCountPerPage) => {
  let data;
  await axios
    .get(`${baseURL}:5000/users/transaction-list?page=${activePage}&limit=${itemCountPerPage}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = [...response.data];
      }
    })
    .catch((err) => {
      window.alert("Error: " + err);
    });
  return data;
};

//Customer search
export const searchCust = async (searchCustomer) => {
  let data = []
  await axios.
    get(`http://localhost:5000/users/customer-search?customer_id=${searchCustomer.customer_id}&customer_souls_id=${searchCustomer.customer_souls_id}&customer_name=${searchCustomer.customer_name}&mobileno=${searchCustomer.mobileno}&customer_gender=${searchCustomer.customer_gender}&customer_email=${searchCustomer.customer_email}&address=${searchCustomer.address}&pincode=${searchCustomer.pincode}&createtime=${searchCustomer.createtime}&registrationsource=${searchCustomer.registrationsource}&lastaccesstime=${searchCustomer.lastaccesstime}&status=${searchCustomer.status}`,{
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
    get(`http://localhost:5000/users/pandingorder-search?order_id=${searchPending.order_id}&customer_id=${searchPending.customer_id}&customer_souls_id=${searchPending.customer_souls_id}&customer_name=${searchPending.customer_name}&number_of_therapist=${searchPending.number_of_therapist}&therapist_gender=${searchPending.therapist_gender}&massage_for=${searchPending.massage_for}&Slot_Time=${searchPending.Slot_Time}&Slot_Date=${searchPending.Slot_Date}&massage_duration=${searchPending.massage_duration}&address=${searchPending.address}&pincode=${searchPending.pincode}&latitude=${searchPending.latitude}&longitude=${searchPending.longitude}&CreatedAt=${searchPending.CreatedAt}&is_order_confirmed=${searchPending.is_order_confirmed}&merchant_transaction_id=${searchPending.merchant_transaction_id}&total_order_amount=${searchPending.total_order_amount}`,{
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
    get(`http://localhost:5000/users/transaction-search?order_id=${searchTrans.order_id}&customer_id=${searchTrans.customer_id}&customer_souls_id=${searchTrans.customer_souls_id}&customer_name=${searchTrans.customer_name}&number_of_therapist=${searchTrans.number_of_therapist}&therapist_gender=${searchTrans.therapist_gender}&massage_for=${searchTrans.massage_for}&Slot_Time=${searchTrans.Slot_Time}&Slot_Date=${searchTrans.Slot_Date}&massage_duration=${searchTrans.massage_duration}&customer_address=${searchTrans.customer_address}&pincode=${searchTrans.pincode}&latitude=${searchTrans.latitude}&longitude=${searchTrans.longitude}&CreatedAt=${searchTrans.CreatedAt}&merchant_transaction_id=${searchTrans.merchant_transaction_id}&payment_gateway_mode=${searchTrans.payment_gateway_mode}&transaction_mode=${searchTrans.transaction_mode}&bank_type=${searchTrans.bank_type}&payment_gateway_id=${searchTrans.payment_gateway_id}&total_order_amount=${searchTrans.total_order_amount}`,{
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