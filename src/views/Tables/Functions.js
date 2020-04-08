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
    get(`http://localhost:5000/users/customer-search?id=${searchCustomer.id}&soulsID=${searchCustomer.soulsID}&name=${searchCustomer.name}&mobileno=${searchCustomer.mobileno}&gender=${searchCustomer.gender}&email=${searchCustomer.email}&address=${searchCustomer.address}&pincode=${searchCustomer.pincode}&createtime=${searchCustomer.createtime}&registrationsource=${searchCustomer.registrationsource}&lastaccesstime=${searchCustomer.lastaccesstime}&status=${searchCustomer.status}`,{
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
    get(`http://localhost:5000/users/pandingorder-search?Order_ID=${searchPending.Order_ID}&customer_ID=${searchPending.customer_ID}&souls_ID=${searchPending.souls_ID}&customer_name=${searchPending.customer_name}&no_of_therapists_required=${searchPending.no_of_therapists_required}&therapist_gender=${searchPending.therapist_gender}&massage_for=${searchPending.massage_for}&slot_time=${searchPending.slot_time}&slot_date=${searchPending.slot_date}&massage_duration=${searchPending.massage_duration}&address=${searchPending.address}&pincode=${searchPending.pincode}&mobile_no=${searchPending.mobile_no}&latitude=${searchPending.latitude}&longitude=${searchPending.longitude}&create_at=${searchPending.create_at}&is_order_confermed=${searchPending.is_order_confermed}&transaction_ID=${searchPending.transaction_ID}&total_order_amount=${searchPending.total_order_amount}`,{
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
    get(`http://localhost:5000/users/transaction-search?Order_ID=${searchTrans.Order_ID}&customer_ID=${searchTrans.customer_ID}&souls_ID=${searchTrans.souls_ID}&customer_name=${searchTrans.customer_name}&no_of_therapists_required=${searchTrans.no_of_therapists_required}&therapist_gender=${searchTrans.therapist_gender}&massage_for=${searchTrans.massage_for}&slot_time=${searchTrans.slot_time}&slot_date=${searchTrans.slot_date}&massage_duration=${searchTrans.massage_duration}&address=${searchTrans.address}&pincode=${searchTrans.pincode}&latitude=${searchTrans.latitude}&longitude=${searchTrans.longitude}&create_at=${searchTrans.create_at}&merchant_transaction_ID=${searchTrans.merchant_transaction_ID}&payment_gateway_mode=${searchTrans.payment_gateway_mode}&transaction_mode=${searchTrans.transaction_mode}&bank_type=${searchTrans.bank_type}&payment_gateway_ID=${searchTrans.payment_gateway_ID}&total_order_amount=${searchTrans.total_order_amount}`,{
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