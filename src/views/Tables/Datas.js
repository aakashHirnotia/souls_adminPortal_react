
//CustomerData
export let customerData=[]

export const SetCustomerData = (data) => {
  customerData=data;
}

export const getCustomerData=(data) => {
  return customerData;
}

//PendingOrderdata
export let PendingOrderData=[]

export const SetPendingOrderData = (data) => {
  PendingOrderData=data;
}

export const getPendingOrderData=(data) => {
  return PendingOrderData;
}

//Transaction data
export let TransactionData=[]

export const SetTransactionData = (data) => {
  TransactionData=data;
}

export const getTransactionData=(data) => {
  return TransactionData;
}

//Partner Data
export let PartnerData=[]

export const SetPartnerData = (data) => {
    PartnerData=data;
}

export const getPartnerData=(data) => {
  return PartnerData;
}

//Assign Partner Data
export let AssignPartnerData=[]

export const SetAssignPartnerData = (data) => {
    AssignPartnerData=data;
}

export const getAssignPartner=(data) => {
  return AssignPartnerData;
}