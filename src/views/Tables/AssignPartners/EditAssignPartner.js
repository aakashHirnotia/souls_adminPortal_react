import React, { Component } from "react";
import { register,updateAssignPartner } from "../Functions";
// import DateCalender from "./DateCalender";
import {AssignPartnerData, SetAssignPartnerData} from '../Datas'
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
    Slot_Time:"",
    Slot_TimeError:"",
    Slot_Date:"",
    Slot_DateError:"",
    customer_address: "",
    cutomer_addressError: "",
    pincode: "",
    pincodeError: "",
    merchant_transaction_id:"",
    merchant_transaction_idError:"",
    partner_souls_id:"",
    partner_souls_idError:"",
    partner_name:"",
    partner_nameError:"",
    partner_mobileno:"",
    partner_mobilenoError:"",
    Commission_Type:"",
    Commission_TypeError:"",
    commission_amount:"",
    commission_amountError:"",
    CreatedAt: "",
    CreatedAtError: "",
    created_by: "",
    created_byError:"",
    updated_by:"",
    updated_byError:"",
    status:"",
    statusError:"",
    isEditable: "",
    errors: {}};

class EditAssignPartner extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    if(AssignPartnerData.length==0) {
      window.location.href='/tables/assignPartners'
    }
    this.setState({isEditable: window.location.pathname.includes('/edit-member')})
  }
  
  componentDidMount(){
    if(this.state.isEditable){
      const assignPartner = AssignPartnerData.find( assignPartner => assignPartner.id.toString() === this.props.match.params.id)
      this.setState({
        partner_souls_id: assignPartner.partner_souls_id,
        partner_name: assignPartner.partner_name,
        partner_mobileno: assignPartner.partner_mobileno,
        Commission_Type: assignPartner.Commission_Type,
        commission_amount: assignPartner.commission_amount,
        updated_by: assignPartner.updated_by,
        status: assignPartner.status
    })
  }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let partner_souls_idError ="";
    let partner_nameError = "";
    let partner_mobilenoError = "";
    let Commission_TypeError = "";
    let commission_amountError = "";
    let update_byError = "";
    let statusError = "";
    if (!this.state.partner_souls_id) {
      partner_souls_idError = "SOULS ID can't sbe empty";
    }
    if (!this.state.partner_name) {
      partner_nameError = "Name can't be empty";
    }
    if (!this.state.partner_mobileno) {
      partner_mobilenoError = "Mobile No can't be empty";
    }
    if (!this.state.Commission_Type) {
      Commission_TypeError = "Can't be empty";
    }
    if (!this.state.commission_amount) {
      commission_amountError = "Can't be empty";
    }
    if (!this.state.updated_by) {
      update_byError = "Can't be empty";
    }
    if (!this.state.status) {
      statusError = "Choose Status";
    }

    if (
        partner_souls_idError ||
        partner_nameError ||
        partner_mobilenoError ||
        Commission_TypeError ||
        commission_amountError ||
        update_byError ||
        statusError 
    ) {
      this.setState({
        partner_souls_idError ,
        partner_nameError ,
        partner_mobilenoError ,
        Commission_TypeError ,
        commission_amountError ,
        update_byError ,
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
          partner_souls_id: this.state.partner_souls_id,
          partner_name: this.state.partner_name,
          partner_mobileno: this.state.partner_mobileno,
          Commission_Type: this.state.Commission_Type,
          commission_amount: this.state.commission_amount,
          updated_by: this.state.updated_by,
          status: this.state.status
        };
        updateAssignPartner(updatedUser).then(res => {
          this.props.history.push(`/assign/partner/list`);
        });
        this.setState(intialState);
    }
  }

  render() {
    return (
        <div>
          <Card>
            <CardHeader>
              <strong>Update Assign Partner: </strong>
              <button 
                      className="btn btn-outline-primary" style={{position:"absolute", right:"20px"}}
                >
                  <a className="createCustomerBtn" href="/tables/assignPartners"> Back </a>
              </button>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="partner souls id">Partner SOULS ID</Label>
                      <Input
                        type="text"
                        name="partner_souls_id"
                        value={this.state.partner_souls_id}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.partner_souls_idError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="partner name">Partner Name</Label>
                      <Input
                        type="text"
                        name="partner_name"
                        value={this.state.partner_name}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 0, color: "red" }}>
                        {this.state.partner_nameError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="partner mobile no">Partner Mobile No</Label>
                      <Input
                        type="text"
                        name="partner_mobileno"
                        value={this.state.partner_mobileno}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.partner_mobilenoError}
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="commission type">Commission Type</Label>
                      <Input
                        type="text"
                        name="Commission_Type"
                        value={this.state.Commission_Type}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.Commission_TypeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="commission amount">Commission Amount</Label>
                      <Input
                        type="text"
                        name="commission_amount"
                        value={this.state.commission_amount}
                        onChange={this.onChange}
                        // disabled={true}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.commission_amountError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="updated by">Updated By</Label>
                      <Input
                        type="text"
                        name="updated_by"
                        value={this.state.updated_by}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.updated_byError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                      >
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Attempted</option>
                        <option>Cancelled</option>
                        <option>Rejected</option>
                      </select>
                      <div style={{ fontSize: 20, color: "red" }}>
                        {this.state.statusError}
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
                </FormGroup>
              </form>
          
            </CardBody>
          </Card>
        </div>
      )
    }
}

export default EditAssignPartner ;