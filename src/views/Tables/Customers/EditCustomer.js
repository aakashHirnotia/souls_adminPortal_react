import React, { Component } from "react";
import { register,updateCustomer } from "../Functions";
// import DateCalender from "./DateCalender";
import {customerData, SetCustomerData} from '../Datas'
import {Card,CardBody,CardHeader,Col,FormGroup,Input,Label} from "reactstrap";

const intialState = {
  id: "",
  idError: "",
  customer_souls_id: "",
  customer_souls_idError: "",
  customer_name: "",
  customer_nameError: "",
  customer_mobile_no: "",
  customer_mobile_noError: "",
  customer_gender: "",
  customer_genderError: "",
  customer_email: "",
  customer_emailError: "",
  customer_address: "",
  cutomer_addressError: "",
  pincode: "",
  pincodeError: "",
  CreatedAt: "",
  CreatedAtError: "",
  registrated_source: "",
  registrated_sourceError: "",
  Last_Access_Time: "",
  Last_Access_TimeError:"",
  status:"",
  statusError:"",
  isEditable: "",
  errors: {}
};

class EditCustomer extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    if(customerData.length==0) {
      window.location.href='/customers'
    }
    this.setState({isEditable: window.location.pathname.includes('/edit-member')})
  }
  
  componentDidMount(){
    if(this.state.isEditable){
      const customer = customerData.find( customer => customer.customer_id.toString() === this.props.match.params.id)
      this.setState({
        customer_name: customer.customer_name,
        customer_mobile_no: customer.customer_mobile_no,
        customer_gender: customer.customer_gender,
        customer_email: customer.customer_email,
        customer_address: customer.customer_address,
        pincode: customer.pincode,
        registrated_source: customer.registrated_source,
        status: customer.status
    })
  }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let customer_nameError = "";
    let customer_mobile_noError = "";
    let customer_genderError = "";
    let customer_emailError = "";
    let customer_addressError = "";
    let pincodeError = "";
    let registrated_sourceError = "";
    let statusError = "";
    if (!this.state.customer_name) {
      customer_nameError = "Name can't sbe empty";
    }
    if (!this.state.customer_mobile_no) {
      customer_mobile_noError = "Mobile No can't be empty";
    }
    if (!this.state.customer_gender) {
      customer_genderError = "Choose Gender";
    }
    if (!this.state.customer_email) {
      customer_emailError = "Email can't be empty";
    }
    if (!this.state.customer_address) {
      customer_addressError = "Address can't be empty";
    }
    if (!this.state.pincode) {
      pincodeError = "Pincode can't be empty";
    }
    if (!this.state.registrated_source) {
        registrated_sourceError = "Can't be empty";
    }
    if (!this.state.status) {
      statusError = "Choose Status";
    }

    if (
      customer_nameError ||
      customer_mobile_noError ||
      customer_genderError ||
      customer_emailError ||
      customer_addressError ||
      pincodeError ||
      registrated_sourceError ||
      statusError 
    ) {
      this.setState({
        customer_nameError,
        customer_mobile_noError,
        customer_genderError,
        customer_emailError,
        customer_addressError,
        pincodeError,
        registrated_sourceError,
        statusError
      });
      return false;
    }
    return true;
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("Submit fucntion called - ")

    console.log("Submit fucntion called - 2 " + this.state.isEditable)
      const isValid = this.validate();
      console.log("isValid = "+isValid)
      if (isValid) {
        const updatedUser = {
          customer_name: this.state.customer_name,
          customer_mobile_no: this.state.customer_mobile_no,
          customer_gender: this.state.customer_gender,
          customer_email: this.state.customer_email,
          customer_address: this.state.customer_address,
          pincode: this.state.pincode,
          registrated_source: this.state.registrated_source,
          status: this.state.status
        };
        updateCustomer(updatedUser).then(res => {
          this.props.history.push(`/customers`);
        });
        this.setState(intialState);
    }
  }

  render() {
    return (
        <div>
          <Card>
            <CardHeader>
              <strong>Update Customer: </strong>
              <button 
                      className="btn btn-primary-primary" style={{position:"absolute", right:"15px"}}
                >
                  <a className="createCustomerBtn" href="/customers"> Back </a>
              </button>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="name"
                        name="customer_name"
                        value={this.state.customer_name}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.customer_nameError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="Mobile No">Mobile No</Label>
                      <Input
                        type="text"
                        id="mobile no"
                        placeholder="mobile no"
                        name="customer_mobile_no"
                        value={this.state.customer_mobile_no}
                        onChange={this.onChange}
                        disabled={true}
                      />
                      <div style={{ fontSize: 0, color: "red" }}>
                        {this.state.customer_mobile_noError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="Email">Email</Label>
                      <Input
                        type="text"
                        id="email"
                        placeholder="Email"
                        name="customer_email"
                        value={this.state.customer_email}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.customer_emailError}
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="textarea"
                        id="address"
                        placeholder="Address"
                        name="customer_address"
                        value={this.state.customer_address}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.customer_addressError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Pincode">Pincode</Label>
                      <Input
                        type="text"
                        id="pincode"
                        placeholder="Pincode"
                        name="pincode"
                        value={this.state.pincode}
                        onChange={this.onChange}
                        
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.pincodeError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-1">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Gender">Gender</Label>
                      <select
                        className="form-control"
                        name="customer_gender"
                        value={this.state.customer_gender}
                        onChange={this.onChange}
                      >
                        <option value="" selected>{this.state.customer_gender!==""?"Clear":"Select"}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other" >Other</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.customer_genderError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                      >
                        <option value="" selected>{this.state.status!==""?"Clear":"Select"}</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <div style={{ fontSize: 20, color: "red" }}>
                        {this.state.statusError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="Last access time">Registrated Source</Label>
                      <Input
                        className="form-control"
                        name="registrated_source"
                        value={this.state.registrated_source}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                          {this.state.registrated_sourceError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="2">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                  {/* <Col xs="5"></Col> */}
                </FormGroup>
              </form>
          
            </CardBody>
          </Card>
        </div>
      )
    }
}

export default EditCustomer ;