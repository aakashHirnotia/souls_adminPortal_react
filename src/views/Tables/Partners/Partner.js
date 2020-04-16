import React, { Component } from "react";
import { registerPartner,updatePartner } from "../Functions";
import DateCalender from "./DateCalender";
import {PartnerData, SetPartnerData} from '../Datas'
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
  latitude: "",
  latitudeError: "",
  longitude: "",
  longitudeError: "",
  rate: "",
  rateError: "",
  commission_type: "",
  commission_typeError: "",
  Onboard_Date:"",
  Onboard_DateError:"",
  created_by: "",
  created_byError: "",
  updated_by: "",
  updated_byError: "",
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
    // if(PartnerData.length==0) {
    //   window.location.href='/tables/ViewPartners'
    // }
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
        latitude: partner.latitude,
        longitude: partner.longitude,
        created_by: partner.created_by,
        updated_by: partner.updated_by,
        Onboard_Date: partner.Onboard_Date,
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
    let latitudeError = "";
    let longitudeError = "";
    let genderError = "";
    let rateError = "";
    let commission_typeError = "";
    let Onboard_DateError = "";
    let created_byError = "";
    let updated_byError= "";
    if (!this.state.name) {
      nameError = "Name can't be empty";
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
    if (!this.state.latitude) {
      latitudeError = "Latitude can't be empty";
    }
    if (!this.state.longitude) {
      longitudeError = "Longitude can't be empty";
    }
    if (!this.state.Onboard_Date) {
      Onboard_DateError = "Onboard Date can't be empty";
    }
    if (!this.state.updated_by) {
      updated_byError = "Updated by can't be empty";
    }
    if (!this.state.created_by) {
      created_byError = "Created by can't be empty";
    }

    if (
      nameError ||
      emailError ||
      mobilenoError ||
      addressError ||
      pincodeError ||
      latitudeError ||
      longitudeError ||
      created_byError ||
      updated_byError ||
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
        latitudeError,
        longitudeError,
        created_byError,
        updated_byError,
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
    let latitudeError = "";
    let longitudeError = "";
    let rateError = "";
    let commission_typeError = "";
    let updated_byError = "";
    let created_byError = "";
    if (!this.state.name) {
      nameError = "Name can't be empty";
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
    if (!this.state.commission_type) {
      commission_typeError = "Commission Type can't be empty";
    }
    if (!this.state.latitude) {
      latitudeError = "Latitude can't be empty";
    }
    if (!this.state.longitude) {
      longitudeError = "Longitude can't be empty";
    }
    if (!this.state.updated_by) {
      updated_byError = "Updated by can't be empty";
    }
    if (!this.state.created_by) {
      created_byError = "Created by can't be empty";
    }

    if (
      nameError ||
      mobilenoError ||
      addressError ||
      pincodeError ||
      latitudeError ||
      longitudeError ||
      updated_byError ||
      created_byError ||
      rateError ||
      commission_typeError
    ) {
      this.setState({
        nameError,
        mobilenoError,
        addressError,
        pincodeError,
        latitudeError,
        longitudeError,
        created_byError,
        updated_byError,
        rateError,
        commission_typeError
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
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          created_by: this.state.created_by,
          updated_by: this.state.updated_by,
          rate: this.state.rate,
          commission_type: this.state.commission_type,
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
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            // Onboard_Date: this.state.Onboard_Date,
            created_by: this.state.created_by,
            updated_by: this.state.updated_by,
            rate: this.state.rate,
            commission_type: this.state.commission_type,
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

  onChangeDate = (date) => {
    // console.log(date.Date());
    console.log("HELLLO");
    // const setStartDate = new Date().setStartDate;
    // console.log(setStartDate(date));
    this.setState({ Onboard_Date: date });
  };

  render() {
    return (
      <div>{!this.state.isEditable ? (
        <div>
          <Card>
            <CardHeader>
              <strong>Create Partner</strong>
              <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
              >
                <a className="createTeamBtn" href="/tables/ViewPartners">
                  Back
                </a>
              </button>
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
                        {this.state.nameError}
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
                            type="textarea"
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
                <div className="row">
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="latitude"
                        name="latitude"
                        value={this.state.latitude}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.latitudeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        type="text"
                        id="longitude"
                        placeholder="longitude"
                        name="longitude"
                        value={this.state.longitude}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.longitudeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                        <Label htmlFor="OnboardDate">Onboard Date</Label>
                        <DateCalender 
                          value={this.state.Onboard_Date}
                          onChange={this.onChangeDate}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.Onboard_DateError}
                        </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-2">
                    <FormGroup>
                        <Label htmlFor="updated_by">Updated By</Label>
                        <Input
                            type="text"
                            id="updated_by"
                            placeholder="updated_by"
                            name="updated_by"
                            value={this.state.updated_by}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.updated_byError}
                        </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="3">
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
                  <Col xs="2">
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
                        <Label htmlFor="created_by">Created By</Label>
                        <Input
                            type="text"
                            id="created_by"
                            placeholder="created_by"
                            name="created_by"
                            value={this.state.created_by}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.created_byError}
                        </div>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                    <Label htmlFor="commission_type">Commission Type</Label>
                      <select
                        className="form-control"
                        name="commission_type"
                        value={this.state.commission_type}
                        onChange={this.onChange}
                      >
                        <option></option>
                        <option>Percentage(%)</option>
                        <option>Flat</option>
                      </select>
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
                            <option value="" selected>{this.state.gender!==""?"Clear":"Select"}</option>
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
              <strong>Update Partner</strong>
              <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
              >
                <a className="createTeamBtn" href="/tables/ViewPartners">
                  Back
                </a>
              </button>
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
                        {this.state.nameError}
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
                        disabled={true}
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
                            type="textarea"
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
                <div className="row">
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="latitude"
                        name="latitude"
                        value={this.state.latitude}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.latitudeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        type="text"
                        id="longitude"
                        placeholder="longitude"
                        name="longitude"
                        value={this.state.longitude}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.longitudeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-2">
                    <FormGroup>
                        <Label htmlFor="Onboard_Date">Onboard Date</Label> <br />
                        <DateCalender
                          value={this.state.Onboard_Date}
                          onChange={this.onChangeDate}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.Onboard_DateError}
                        </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-2">
                    <FormGroup>
                        <Label htmlFor="created_by">Created By</Label>
                        <Input
                            type="text"
                            id="created_by"
                            placeholder="created_by"
                            name="created_by"
                            value={this.state.created_by}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.created_byError}
                        </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-2">
                    <FormGroup>
                        <Label htmlFor="updated_by">Updated By</Label>
                        <Input
                            type="text"
                            id="updated_by"
                            placeholder="updated_by"
                            name="updated_by"
                            value={this.state.updated_by}
                            onChange={this.onChange}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                            {this.state.updated_byError}
                        </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="3">
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
                  <Col xs="3">
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
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="commission_type">Commission Type</Label>
                      <select
                        className="form-control"
                        name="commission_type"
                        value={this.state.commission_type}
                        onChange={this.onChange}
                      >
                        <option></option>
                        <option>Percentage(%)</option>
                        <option>Flat</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.commission_typeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            className="form-control"
                            name="gender"
                            value={this.state.gender}
                            // disabled={true}
                            onChange={this.onChange}
                        >
                            <option value="" selected>{this.state.gender!==""?"Clear":"Select"}</option>
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
