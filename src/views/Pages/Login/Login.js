import React, { Component } from "react";
import * as EmailValidator from 'email-validator';
//import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { login } from "./../../Team/UserFunctions";

// const initialState = {
//   email: "",
//   emailError: "",
//   password: "",
//   passwordError: "",
//   error: {},
//   status: "",
// }

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      error: {},
      status: "",
      loading: false
    };
    // this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () =>{
    let emailError = "";
    let passwordError = "";
    if(!this.state.email){
      emailError = "Email can't be empty"
    }
    else if (!EmailValidator.validate(this.state.email)) {
      emailError = "Invalid Email Address";
    }
    if(!this.state.password){
      passwordError = "Password can't be empty"
    }
    if(
      emailError ||
      passwordError
    ) {
      this.setState({
        emailError,
        passwordError
      });
      return false;
    }
    return true;
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid){
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.setState({ status: "Logging in...", loading: true  });
      const error = await login(user);
      console.log(error);
      if (error) {
        this.setState({ status: error });
        this.setState({loading: false})
      }
      if(this.state.status == "sql: no rows in result set"){
        this.setState({status : "Invalid Email or Password"})
      }

    // const user = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    // this.setState({ status: "Logging in...",loading: true });
    // const error = await login(user);
    // console.log(error);
    // if (error) {
    //   this.setState({ status: error });
    //   this.setState({loading: false})
    // }
    
  };
}

  render() {
    console.log(this.props);
    const {loading} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-3">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.state.status && (
                        <p
                          style={
                            this.state.status === "Logging in..."
                              ? { color: "blue" }
                              : { color: "red" }
                          }
                        >
                          {this.state.status}
                        </p>
                      )}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          autoComplete="username"
                        />
                      </InputGroup>
                      <div style={{ fontSize: 10, color: "red" }}>
                          {this.state.emailError}
                      </div>
                      <br/>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        
                      </InputGroup>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.passwordError}
                      </div>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this.onSubmit}
                            disabled={loading}
                          >
                            {loading && <i className=" fa fa-refresh fa-spin">{" "} </i>}
                            Login
                          </Button>
                        </Col>
                        {/* <span >
                          {this.state.status && (
                            <p
                              style={
                                this.state.status === "Logging in..."
                                  ? { color: "blue" }
                                  : { color: "red" }
                              }
                            >
                              {this.state.status}
                            </p>
                          )}
                          </span> */}

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
