// import React, { Component } from "react";
// import { register,updateMember } from "./Function";
// import DateCalender from "./DateCalender";
// import {customerData, SetCustomerData} from './Datas'
// import {Card,CardBody,CardHeader,Col,FormGroup,Input,Label} from "reactstrap";

// const intialState = {
//   id: "",
//   idError: "",
//   customer_souls_id: "",
//   customer_souls_idError: "",
//   customer_name: "",
//   customer_nameError: "",
//   customer_mobile_no: "",
//   customer_mobile_noError: "",
//   customer_gender: "",
//   customer_genderError: "",
//   customer_email: "",
//   customer_emailError: "",
//   customer_address: "",
//   cutomer_addressError: "",
//   pincode: "",
//   pincodeError: "",
//   CreatedAt: "",
//   CreatedAtError: "",
//   registrated_source: "",
//   registrated_sourceError: "",
//   Last_Access_Time: "",
//   Last_Access_TimeError:"",
//   status:"",
//   statusError:"",
//   errors: {}
// };

// class EditCustomer extends Component {
//   constructor() {
//     super();
//     this.state = intialState;

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentWillMount(){
//     this.setState({isEditable: window.location.pathname.includes('/edit-member')})
//   }
  
//   componentDidMount(){
//       const customer = CustomerData.find( customer => customer.customer_souls_id.toString() === this.props.match.params.id)
//       this.setState({
//         customer_name: customer.customer_name,
//         customer_mobile_no: customer.customer_mobile_no,
//         customer_gender: customer.customer_gender,
//         customer_email: customer.customer_email,
//         customer_address: customer.customer_address,
//         pincode: customer.pincode,
//         Last_Access_Time: customer.Last_Access_Time,
//         status: customer.status,
//     })
//   }


//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   validate = () => {
//     let customer_nameError = "";
//     let customer_mobile_noError = "";
//     let customer_genderError = "";
//     let customer_emailError = "";
//     let customer_addressError = "";
//     let pincodeError = "";
//     let Last_Access_TimeError = "";
//     let statusError = "";
//     if (!this.state.customer_name) {
//       customer_nameError = "Name can't sbe empty";
//     }
//     if (!this.state.customer_mobile_no) {
//       customer_mobile_noError = "Mobile No can't be empty";
//     }
//     if (!this.state.customer_gender) {
//       customer_genderError = "Choose Gender";
//     }
//     if (!this.state.customer_email) {
//       customer_emailError = "Email can't be empty";
//     }
//     if (!this.state.customer_address) {
//       customer_addressError = "Address can't be empty";
//     }
//     if (!this.state.pincode) {
//       pincodeError = "Pincode can't be empty";
//     }
//     if (!this.state.Last_Access_Time) {
//         Last_Access_TimeError = "Can't be empty";
//     }
//     if (!this.state.status) {
//       statusError = "Choose Status";
//     }

//     if (
//       customer_nameError ||
//       customer_mobile_noError ||
//       customer_genderError ||
//       customer_emailError ||
//       customer_addressError ||
//       pincodeError ||
//       Last_Access_TimeError ||
//       statusError 
//     ) {
//       this.setState({
//         customer_nameError,
//         customer_mobile_noError,
//         customer_genderError,
//         customer_emailError,
//         customer_addressError,
//         pincodeError,
//         Last_Access_TimeError,
//         statusError
//       });
//       return false;
//     }
//     return true;
//   };

//   onSubmit(e) {
//     e.preventDefault();
//     console.log("Submit fucntion called - ")

//     console.log("Submit fucntion called - 2 " + this.state.isEditable)
//       const isValid = this.validate();
//       console.log("isValid = "+isValid)
//       if (isValid) {
//         const updatedUser = {
//           customer_name: this.state.customer_name,
//           customer_mobile_no: this.state.customer_mobile_no,
//           customer_gender: this.state.customer_gender,
//           customer_email: this.state.customer_email,
//           customer_address: this.state.customer_address,
//           pincode: this.state.pincode,
//           Last_Access_Time: this.state.Last_Access_Time,
//           status: this.state.status
//         };
//         updateMember(updatedUser).then(res => {
//           this.props.history.push(`/customers/list`);
//         });
//         this.setState(intialState);
        
//     }
//   }

//   render() {
//     return (
//         <div>
//           <Card>
//             <CardHeader>
//               <strong>Edit Member: </strong>
//             </CardHeader>
//             <CardBody>
//               <form onSubmit={this.onSubmit}>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <FormGroup>
//                       <Label htmlFor="first name">Name</Label>
//                       <Input
//                         type="text"
//                         id="name"
//                         placeholder="name"
//                         name="customer_name"
//                         value={this.state.customer_name}
//                         onChange={this.onChange}
//                       />
//                       <div style={{ fontSize: 10, color: "red" }}>
//                         {this.state.customer_nameError}
//                       </div>
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-4">
//                     <FormGroup>
//                       <Label htmlFor="last name">Mobile No</Label>
//                       <Input
//                         type="text"
//                         id="mobile no"
//                         placeholder="mobile no"
//                         name="customer_mobile_no"
//                         value={this.state.customer_mobile_no}
//                         onChange={this.onChange}
//                       />
//                       <div style={{ fontSize: 0, color: "red" }}>
//                         {this.state.customer_mobile_noError}
//                       </div>
//                     </FormGroup>
//                   </div>
//                   <div className="col-md-4">
//                     <FormGroup>
//                       <Label htmlFor="mobile-no">Email</Label>
//                       <Input
//                         type="text"
//                         id="email"
//                         placeholder="Email"
//                         name="customer_email"
//                         value={this.state.customer_email}
//                         onChange={this.onChange}
//                       />
//                       <div style={{ fontSize: 10, color: "red" }}>
//                         {this.state.customer_emailError}
//                       </div>
//                     </FormGroup>
//                   </div>
//                 </div>
//                 <FormGroup row className="my-0">
//                   <Col xs="4">
//                     <FormGroup>
//                       <Label htmlFor="address">Address</Label>
//                       <Input
//                         type="text"
//                         id="address"
//                         placeholder="Address"
//                         name="customer_address"
//                         value={this.state.customer_address}
//                         onChange={this.onChange}
//                       />
//                       <div style={{ fontSize: 10, color: "red" }}>
//                         {this.state.customer_addressError}
//                       </div>
//                     </FormGroup>
//                   </Col>
//                   <Col xs="2">
//                     <FormGroup>
//                       <Label htmlFor="email">Pincode</Label>
//                       <Input
//                         type="text"
//                         id="pincode"
//                         placeholder="Pincode"
//                         name="pincode"
//                         value={this.state.pincode}
//                         onChange={this.onChange}
//                         disabled={true}
//                       />
//                       <div style={{ fontSize: 10, color: "red" }}>
//                         {this.state.pincodeError}
//                       </div>
//                     </FormGroup>
//                   </Col>
//                   <div className="col-md-4">
//                     <FormGroup>
//                       <Label htmlFor="last name">Gender</Label>
//                       <Input
//                         type="text"
//                         id="gender"
//                         placeholder="gender"
//                         name="customer_gender"
//                         value={this.state.customer_gender}
//                         onChange={this.onChange}
//                       />
//                       <div style={{ fontSize: 10, color: "red" }}>
//                         {this.state.customer_genderError}
//                       </div>
//                     </FormGroup>
//                   </div>
//                   <Col xs="2">
//                     <FormGroup>
//                       <Label htmlFor="status">Status</Label>
//                       <select
//                         className="form-control"
//                         name="status"
//                         value={this.state.status}
//                         onChange={this.onChange}
//                       >
//                         <option>Active</option>
//                         <option>Inactive</option>
//                         {/* <option>Deleted</option> */}
//                       </select>
//                       <div style={{ fontSize: 20, color: "red" }}>
//                         {this.state.statusError}
//                       </div>
//                     </FormGroup>
//                   </Col>
//                                   <FormGroup row className="my-0">
//                   <Col xs="4">
//                     <FormGroup>
//                       <button type="submit" className="btn btn-outline-primary">
//                         Submit
//                       </button>
//                     </FormGroup>
//                   </Col>
//                 </FormGroup>
//               </form>
//             </CardBody>
//           </Card>
//         </div>
//       )
//     }

// export default EditCustomer;