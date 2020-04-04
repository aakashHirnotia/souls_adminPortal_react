import React, { Component } from "react";
import { register } from "./UserFunctions";
import DateCalender from "./DateCalender";
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
  first_name: "",
  first_nameError: "",
  last_name: "",
  last_nameError: "",
  gender: "",
  genderError: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  joining: "",
  joiningError: "",
  address: "",
  addressError: "",
  status: "",
  statusError: "",
  role: "",
  roleError: "",
  mobile: "",
  mobileError: "",
  errors: {}
};

class Team extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let first_nameError = "";
    let last_nameError = "";
    let passwordError = "";
    let mobileError = "";
    let emailError = "";
    let joiningError = "";
    let addressError = "";
    let genderError = "";
    let roleError = "";
    let statusError = "";
    if (!this.state.first_name) {
      first_nameError = "First Name can't sbe empty";
    }
    if (!this.state.last_name) {
      last_nameError = "can't be empty";
    }
    if (!this.state.password) {
      passwordError = "can't be empty";
    }
    if (!this.state.mobile) {
      mobileError = "can't be empty";
    }
    if (!this.state.email || !this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    // if(!this.state.joining){
    //   joiningError = "can't be empty";
    // }
    if (!this.state.address) {
      addressError = "can't be empty";
    }
    if (!this.state.gender) {
      genderError = "choose gender";
    }
    if (!this.state.role) {
      roleError = "choose role";
    }
    if (!this.state.status) {
      statusError = "choose status";
    }

    if (
      first_nameError ||
      last_nameError ||
      passwordError ||
      mobileError ||
      emailError ||
      joiningError ||
      addressError ||
      roleError ||
      statusError ||
      genderError
    ) {
      this.setState({
        first_nameError,
        last_nameError,
        passwordError,
        mobileError,
        emailError,
        joiningError,
        addressError,
        genderError,
        statusError,
        roleError
      });
      return false;
    }
    return true;
  };

  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const newUser = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        gender: this.state.gender,
        email: this.state.email,
        password: this.state.password,
        joining: this.state.joining,
        address: this.state.address,
        status: this.state.status,
        role: this.state.role,
        mobile: this.state.mobile
      };

      register(newUser).then(res => {
        this.props.history.push(`/profile`);
      });
      this.setState(intialState);
    }
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Create Team</strong>
            {/* <small> Form</small> */}
          </CardHeader>
          <CardBody>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <FormGroup>
                    <Label htmlFor="first name">First Name</Label>
                    <Input
                      type="text"
                      id="first name"
                      placeholder="First name"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.first_nameError}
                    </div>
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup>
                    <Label htmlFor="last name">Last Name</Label>
                    <Input
                      type="text"
                      id="last name"
                      placeholder="Last Name"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.last_nameError}
                    </div>
                  </FormGroup>
                </div>
                <div className="col-md-4">
                  <FormGroup>
                    <Label htmlFor="mobile-no">Mobile No.</Label>
                    <Input
                      type="text"
                      id="mobile-no"
                      placeholder="Mobile No."
                      name="mobile"
                      value={this.state.mobile}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.mobileError}
                    </div>
                  </FormGroup>
                </div>
              </div>
              <FormGroup row className="my-0">
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="Email ID"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.emailError}
                    </div>
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    <Label htmlFor="joining-date">Joining Date</Label> <br />
                    <DateCalender />
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.joiningError}
                    </div>
                    {/* <Input type="text" id="joining-date" placeholder="DD/MM/YYYY" name="joining" value={this.state.joining}  onChange={this.onChange}/> */}
                  </FormGroup>
                </Col>
              </FormGroup>

              <FormGroup row className="my-0">
                <Col xs="6">
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
                </Col>
                <Col xs="2">
                  <FormGroup>
                    <Label htmlFor="status">Status</Label>
                    <select
                      className="form-control"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Deleted</option>
                    </select>
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.statusError}
                    </div>
                  </FormGroup>
                </Col>
                <Col xs="2">
                  <FormGroup>
                    <Label htmlFor="role">Role</Label>
                    <select
                      className="form-control"
                      name="role"
                      value={this.state.role}
                      onChange={this.onChange}
                    >
                      <option>Admin</option>
                      <option>Accountant</option>
                      <option>Customer Care</option>
                    </select>
                    <div style={{ fontSize: 10, color: "red" }}>
                      {this.state.roleError}
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
    );
  }
}

export default Team;
