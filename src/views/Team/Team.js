import React, { Component } from "react";
import { register, updateMember } from "./UserFunctions";
import { Link } from "react-router-dom";
import DateCalender from "./DateCalender";
import { TeamData, SetTeamData } from "./TeamData";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
// import TextEditor from "../Admin/TextEditor.js";

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
  joining: new Date(),
  joiningError: "",
  address: "",
  addressError: "",
  status: "",
  statusError: "",
  role: "",
  roleError: "",
  mobile: "",
  mobileError: "",
  isEditable: "",
  errors: {},
};

class Team extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      isEditable: window.location.pathname.includes("/edit-member"),
    });
  }

  componentDidMount() {
    if (this.state.isEditable) {
      const team = TeamData.find(
        (team) => team.teamid.toString() === this.props.match.params.id
      );
      console.log("HELLP");
      console.log(team);
      this.setState({
        first_name: team.firstname,
        last_name: team.lastname,
        gender: team.gender,
        email: team.email,
        address: team.address,
        status: team.status,
        // role: team.role,
        mobile: team.mobileno,
      });
    }
  }

  onChange(e, editor) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate1 = () => {
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
      last_nameError = "Last Name can't be empty";
    }
    if (!this.state.password) {
      passwordError = "Password can't be empty";
    }
    if (!this.state.mobile) {
      mobileError = "Mobile No can't be empty";
    }
    if (!this.state.email || !this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    if (!this.state.joining) {
      joiningError = "Date can't be empty";
    }
    if (!this.state.address) {
      addressError = "Address can't be empty";
    }
    if (!this.state.gender) {
      genderError = "Choose Gender";
    }
    if (!this.state.role) {
      roleError = "Choose Role";
    }
    if (!this.state.status) {
      statusError = "Choose Status";
    }

    if (
      first_nameError ||
      last_nameError ||
      passwordError ||
      mobileError ||
      emailError ||
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
        addressError,
        genderError,
        statusError,
        roleError,
      });
      return false;
    }
    return true;
  };

  validate2 = () => {
    let first_nameError = "";
    let last_nameError = "";
    let mobileError = "";
    let addressError = "";
    let genderError = "";
    // let roleError = "";
    let statusError = "";
    if (!this.state.first_name) {
      first_nameError = "First Name can't sbe empty";
    }
    if (!this.state.last_name) {
      last_nameError = "Last Name can't be empty";
    }
    if (!this.state.mobile) {
      mobileError = "Mobile No can't be empty";
    }
    if (!this.state.address) {
      addressError = "Address can't be empty";
    }
    if (!this.state.gender) {
      genderError = "Choose Gender";
    }
    // if (!this.state.role) {
    //   roleError = "Choose Role";
    // }
    if (!this.state.status) {
      statusError = "Choose Status";
    }

    if (
      first_nameError ||
      last_nameError ||
      mobileError ||
      addressError ||
      // roleError ||
      statusError ||
      genderError
    ) {
      this.setState({
        first_nameError,
        last_nameError,
        mobileError,
        addressError,
        genderError,
        statusError,
        // roleError
      });
      return false;
    }
    return true;
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("Submit fucntion called - ");

    console.log("Submit fucntion called - 2 " + this.state.isEditable);
    if (this.state.isEditable) {
      const isValid = this.validate2();
      console.log("isValid = " + isValid);
      if (isValid) {
        const updatedUser = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          gender: this.state.gender,
          address: this.state.address,
          email: this.state.email,
          status: this.state.status,
          // role: this.state.role,
          mobile: this.state.mobile,
        };
        updateMember(updatedUser).then((res) => {
          this.props.history.push(`/team/list`);
        });
        this.setState(intialState);
      }
    } else {
      const isValid = this.validate1();
      console.log("VALIDATING: " + isValid);
      console.log(this.state);
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
          mobile: this.state.mobile,
        };
        register(newUser).then((res) => {
          this.props.history.push(`/team/list`);
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
    this.setState({ joining: date });
  };

  render() {
    console.log("AKLFHASJF");
    console.log(this.state);
    return (
      <div>
        {!this.state.isEditable ? (
          <div>
            <Card>
              <CardHeader>
                <strong>Create Team</strong>
                {/* <small> Form</small> */}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <Link className="createTeamBtn" to="/team/list">
                    Back
                  </Link>
                </button>
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
                        <Label htmlFor="joining-date">Joining Date</Label>{" "}
                        <br />
                        <DateCalender
                          value={this.state.joining}
                          onChange={this.onChangeDate}
                        />
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
                        {/* <TextEditor value={this.state.address} onChange={this.onChangeEditor}/> */}
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
                          <option value="" selected>
                            {this.state.status !== "" ? "Clear" : "Select"}
                          </option>
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
                          <option value="" selected>
                            {this.state.role !== "" ? "Clear" : "Select"}
                          </option>
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
                          <option value="" selected>
                            {this.state.gender !== "" ? "Clear" : "Select"}
                          </option>
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
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
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
        ) : (
          <div>
            <Card>
              <CardHeader>
                <strong>Edit Member: </strong>
                {/* <small> Form</small> */}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/team/list">
                    Back
                  </a>
                </button>
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
                          disabled={true}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                          {this.state.emailError}
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
                          <option value="" selected>
                            {this.state.status !== "" ? "Clear" : "Select"}
                          </option>
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Deleted</option>
                        </select>
                        <div style={{ fontSize: 20, color: "red" }}>
                          {this.state.statusError}
                        </div>
                      </FormGroup>
                    </Col>
                    {/* <Col xs="2">
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
                  </Col> */}
                    <Col xs="2">
                      <FormGroup>
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          className="form-control"
                          name="gender"
                          value={this.state.gender}
                          onChange={this.onChange}
                        >
                          <option value="" selected>
                            {this.state.gender !== "" ? "Clear" : "Select"}
                          </option>
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
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
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
        )}
      </div>
    );
  }
}

export default Team;
