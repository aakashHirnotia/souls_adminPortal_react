import React, { Component } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
// import jwt_decode from 'jwt-decode'
import {fetchUserDetails} from './../Team/UserFunctions'
import {update} from './../Team/UserFunctions'
// import {getProfileData} from './../Tables/Datas'
// import { Row } from 'reactstrap'

class ViewProfile extends Component {
  constructor() {
    super()
    this.state = {
      data:[],
      first_name:'',
      last_name: '',
      gender: '',
      email: '',
      // password: '',
      joining: '',
      address: '',
      status: '',
      role: '',
      mobile: '',
      isInEditMode: false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  changeEditMode=()=>{
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }

  onUpdate(e){
    e.preventDefault()

    this.changeEditMode()
    
    const updatedUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      // password: this.state.password,
      joining: this.state.joining,
      address: this.state.address,
      status: this.state.status,
      role: this.state.role,
      mobile: this.state.mobile
    }

    update(updatedUser).then(res => {
      // this.props.history.push(`/profile`)
      console.log("Profile Updated Successful!")
    })
  }

  componentDidMount() {
    // const token = localStorage.usertoken
    const token = localStorage.getItem('token')
    // const decoded = jwt_decode(token)
    console.log("token = "+token)
    fetchUserDetails(token, this.fetchedUser)
  }

  fetchedUser = (res, err) => {
    console.log("Component did mount me fetchUser")
    if(err) { this.props.history.push(`/login`) }
    else {
      console.log("res.teamid = ")
      console.log(res);
      this.setState({
        first_name: res.firstname,
        last_name: res.lastname,
        // gender: res.gender,
        email: res.email,
        // password: res.password,
        joining: res.Joining_Date,
        address: res.address,
        status: res.status,
        role: res.role,
        mobile: res.mobileno
      })
    }
  }

  renderDefaultView=()=>{
    return (
      <div  className="animated fadeIn">
        <Row>
          <Col xs="12" sm="3"></Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Profile</strong>
                {/* <small> Form</small> */}
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="firstname">First Name</Label>
                  <Input type="text" name="first_name" value={this.state.first_name} disabled={true} defaultValue={this.state.first_name}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input type="text" name="last_name" value={this.state.last_name} disabled={true} defaultValue={this.state.last_name}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" name="email" value={this.state.email} disabled={true} defaultValue={this.state.email}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="mobile">Mobile No</Label>
                  <Input type="text" name="mobile" value={this.state.mobile} disabled={true} defaultValue={this.state.mobile}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="joining">Joining Date</Label>
                      <Input type="text" name="joining" value={this.state.joining} disabled={true} defaultValue={this.state.joining}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="role">Role</Label>
                      <Input type="text" name="role" value={this.state.role} disabled={true} defaultValue={this.state.role}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input type="text" name="address" value={this.state.address} disabled={true} defaultValue={this.state.address}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input type="text" name="status" value={this.state.status} disabled={true} defaultValue={this.state.status}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <button 
                  onClick={this.changeEditMode}
                  className="btn btn-sm btn-outline-primary btn-block"
                >
                  update profile
                </button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="3"></Col>
          </Row>
       </div>
    )
  }

  renderEditView=()=>{
    return (
      <div  className="animated fadeIn">
        <Row>
          <Col xs="12" sm="3"></Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Update Profile</strong>
                {/* <small> Form</small> */}
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="firstname">First Name</Label>
                  <Input type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} defaultValue={this.state.first_name}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} defaultValue={this.state.last_name}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" name="email" value={this.state.email} disabled={true} defaultValue={this.state.email}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="mobile">Mobile No</Label>
                  <Input type="text" name="mobile" value={this.state.mobile} onChange={this.onChange} defaultValue={this.state.mobile}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="joining">Joining Date</Label>
                      <Input type="text" name="joining" value={this.state.joining} disabled={true} defaultValue={this.state.joining}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="role">Role</Label>
                      <Input type="text" name="role" value={this.state.role} disabled={true} defaultValue={this.state.role}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input type="text" name="address" value={this.state.address} onChange={this.onChange} defaultValue={this.state.address}/> 
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="status">Status</Label>
                      <Input type="text" name="status" value={this.state.status} disabled={true} defaultValue={this.state.status}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <button
                    className="btn btn-sm btn-outline-primary btn-block"
                    style={{justifyContent:"center", display:"flex"}}
                    onClick={this.onUpdate}
                >
                    Update!
                </button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="3"></Col>
          </Row>
       </div>
    )
  }

  render() {
    return this.state.isInEditMode?
    this.renderEditView() :
    this.renderDefaultView()
  }
}

export default ViewProfile