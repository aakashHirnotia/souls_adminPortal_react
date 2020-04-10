import React, { Component } from "react";
import { registerPartner,updatePartner } from "./Functions";
import {PartnerData, SetPartnerData} from './Datas'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const intialState = {
  name: "",
  nameError: "",
  email: "",
  emailError: "",
  mobileno: "",
  mobilenoError: "",
  address: "",
  addressError: "",
  pincode: "",
  pincodeError: "",
  rate: "",
  rateError: "",
  commission_type: "",
  commission_typeError: "",
  gender: "",
  genderError: "",
  isEditable: "",
  errors: {}
};

class Partner extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({isEditable: window.location.pathname.includes('/edit-partner')})
  }
  
  componentDidMount(){

    if(this.state.isEditable){
      const partner = PartnerData.find( partner => partner.partner_id.toString() === this.props.match.params.id)
      this.setState({
        name: partner.partner_name,
        email: partner.partner_email,
        mobileno: partner.partner_mobileno,
        address: partner.partner_address,
        pincode: partner.pincode,
        rate: partner.Rate,
        commission_type: partner.Commission_Type,
        gender: partner.partner_gender
      })
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate1 = () => {
    let nameError = "";
    let emailError = "";
    let mobilenoError = "";
    let addressError = "";
    let pincodeError = "";
    let genderError = "";
    let rateError = "";
    let commission_typeError = "";
    if (!this.state.name) {
      nameError = "Name can't sbe empty";
    }
    if (!this.state.email || !this.state.email.includes("@")) {
      emailError = "Email can't be empty";
    }
    if (!this.state.mobileno) {
      mobilenoError = "Mobile No can't be empty";
    }
    if (!this.state.address) {
      addressError = "Address can't be empty";
    }
    if (!this.state.pincode) {
        pincodeError = "Pincode can't be empty";
    }
    if (!this.state.rate) {
        rateError = "Rate can't be empty";
    }
    if (!this.state.gender) {
      genderError = "Choose Gender";
    }
    if (!this.state.commission_type) {
      commission_typeError = "Commission Type can't be empty";
    }

    if (
      nameError ||
      emailError ||
      mobilenoError ||
      addressError ||
      pincodeError ||
      rateError ||
      commission_typeError ||
      genderError
    ) {
      this.setState({
        nameError,
        emailError,
        mobilenoError,
        addressError,
        pincodeError,
        rateError,
        commission_typeError,
        genderError
      });
      return false;
    }
    return true;
  };

  validate2 = () => {
    let nameError = "";
    let mobilenoError = "";
    let addressError = "";
    let pincodeError = "";
    let genderError = "";
    let rateError = "";
    let commission_typeError = "";
    if (!this.state.name) {
        nameError = "Name can't sbe empty";
      }
    if (!this.state.mobileno) {
        mobilenoError = "Mobile No can't be empty";
    }
    if (!this.state.address) {
        addressError = "Address can't be empty";
    }
    if (!this.state.pincode) {
        pincodeError = "Pincode can't be empty";
    }
    if (!this.state.rate) {
        rateError = "Rate can't be empty";
    }
    if (!this.state.gender) {
        genderError = "Choose Gender";
    } 
    if (!this.state.commission_type) {
        commission_typeError = "Commission Type can't be empty";
    }

    if (
        nameError ||
        mobilenoError ||
        addressError ||
        pincodeError ||
        rateError ||
        commission_typeError ||
        genderError
      ) {
        this.setState({
          nameError,
          mobilenoError,
          addressError,
          pincodeError,
          rateError,
          commission_typeError,
          genderError
        });
        return false;
      }
      return true;
  };


  onSubmit(e) {
    e.preventDefault();
    console.log("Submit fucntion called - ")

    console.log("Submit fucntion called - 2 " + this.state.isEditable)
    if(this.state.isEditable){
      const isValid = this.validate2();
      console.log("isValid = "+isValid)
      if (isValid) {
        const updatedPartner = {
          partner_name: this.state.name,
          partner_email: this.state.email,
          partner_mobileno: this.state.mobileno,
          partner_address: this.state.address,
          pincode: this.state.pincode,
          Rate: this.state.rate,
          Commission_Type: this.state.commission_type,
          partner_gender: this.state.gender
        };
        updatePartner(updatedPartner).then(res => {
          this.props.history.push(`/tables/ViewPartners`);
        });
        this.setState(intialState);
        
      }

    }
    else{
      const isValid = this.validate1();
      console.log(isValid)
      if (isValid) {
        const newPartner = {
            partner_name: this.state.name,
            partner_email: this.state.email,
            partner_mobileno: this.state.mobileno,
            partner_address: this.state.address,
            pincode: this.state.pincode,
            Rate: this.state.rate,
            Commission_Type: this.state.commission_type,
            partner_gender: this.state.gender
          };
          console.log("ffgg")
        registerPartner(newPartner).then(res => {
          this.props.history.push(`/tables/ViewPartners`);
        });
        this.setState(intialState);
        
      }
    }
  }

  render() {
    return (
      <div>{!this.state.isEditable ? (
        <div>
          <Card>
            <CardHeader>
              <strong>Create Partner</strong>
              {/* <small> Form</small> */}
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.first_nameError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="text"
                        id="email"
                        placeholder="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            type="text"
                            id="address"
                            placeholder="Address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.addressError}
                        </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                        <Label htmlFor="address">Mobile No</Label>
                        <Input
                            type="text"
                            id="mobileno"
                            placeholder="mobileno"
                            name="mobileno"
                            value={this.state.mobileno}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.mobilenoError}
                        </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        type="text"
                        id="pincode"
                        placeholder="pincode"
                        name="pincode"
                        value={this.state.pincode}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.pincodeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="rate">Rate</Label>
                      <Input
                        type="text"
                        id="rate"
                        placeholder="rate"
                        name="rate"
                        value={this.state.rate}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.rateError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                      <Label htmlFor="commission_type">Commission Type</Label>
                      <Input
                        type="text"
                        id="commission_type"
                        placeholder="commission_type"
                        name="commission_type"
                        value={this.state.commission_type}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.commission_typeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.onChange}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.genderError}
                        </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  {/* <Col xs="4"></Col> */}
                  <Col xs="4">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                  {/* <Col xs="4"></Col> */}
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </div>
      )
        :
      (
        <div>
          <Card>
            <CardHeader>
              <strong>Create Partner</strong>
              {/* <small> Form</small> */}
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
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.first_nameError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="text"
                        id="email"
                        placeholder="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        disabled={true}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.emailError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            type="text"
                            id="address"
                            placeholder="Address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.addressError}
                        </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        type="text"
                        id="pincode"
                        placeholder="pincode"
                        name="pincode"
                        value={this.state.pincode}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.pincodeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="rate">Rate</Label>
                      <Input
                        type="text"
                        id="rate"
                        placeholder="rate"
                        name="rate"
                        value={this.state.rate}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.rateError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                      <Label htmlFor="commission_type">Commission Type</Label>
                      <Input
                        type="text"
                        id="commission_type"
                        placeholder="commission_type"
                        name="commission_type"
                        value={this.state.commission_type}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.commission_typeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            onChange={this.onChange}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.genderError}
                        </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  {/* <Col xs="4"></Col> */}
                  <Col xs="4">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                  {/* <Col xs="4"></Col> */}
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </div>)}
      </div>
    );
    
  }
}

export default Partner;
