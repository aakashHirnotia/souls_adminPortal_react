import React, { Component } from 'react';
import { register } from './UserFunctions'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';

class Team extends Component {

    constructor(){
        super()
        this.state = {
            first_name : '',
            last_name : '',
            gender : '',
            email : '',
            password : '',
            joining : '',
            address : '',
            status : '',
            role: '',
            mobile : '',
            errors : {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    
    onChange(e){
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit(e){
        e.preventDefault()
        const newUser ={
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
        }

        register(newUser).then(res => {
            this.props.history.push(`/profile`)
        })
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
                            <Input type="text" id="first name" placeholder="First name" name="first_name" value={this.state.first_name}  onChange={this.onChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="last name">Last Name</Label>
                            <Input type="text" id="last name" placeholder="Last Name" name="last_name" value={this.state.last_name}  onChange={this.onChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="gender">Gender</Label>
                            <select className="form-control" name="gender" value={this.state.gender}  onChange={this.onChange}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select> 
                        </FormGroup>
                    </div>
                </div>  
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input type="text" id="email" placeholder="Email ID" name="email" value={this.state.email}  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="Password" name="password" value={this.state.password}  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="joining-date">Joining Date</Label>
                      <Input type="text" id="joining-date" placeholder="DD/MM/YYYY" name="joining" value={this.state.joining}  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input type="text" id="address" placeholder="Address" name="address" value={this.state.address}  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                    <Label htmlFor="status">Status</Label>
                            <select className="form-control" name="status" value={this.state.status}  onChange={this.onChange}>
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Deleted</option>
                            </select> 
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                    <Label htmlFor="role">Role</Label>
                            <select className="form-control" name="role" value={this.state.role}  onChange={this.onChange}>
                                <option>Admin</option>
                                <option>Accountant</option>
                                <option>Customer Care</option>
                            </select> 
                    </FormGroup>
                  </Col>
                  <Col xs="2">
                    <FormGroup>
                      <Label htmlFor="mobile-no">Mobile No.</Label>
                      <Input type="text" id="mobile-no" placeholder="Mobile No." name="mobile" value={this.state.mobile}  onChange={this.onChange}/>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                    {/* <Col xs="4"></Col> */}
                    <Col xs="4">
                        <FormGroup>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </FormGroup>
                    </Col>
                    {/* <Col xs="4"></Col> */}
                </FormGroup>
                </form>
              </CardBody>
            </Card>
        </div> );
        }
}
 
export default Team;