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
import { fetchUserDetails, fetchUserPic } from './../Team/UserFunctions'
import {update} from './../Team/UserFunctions'
import {updateProfilePic} from './../Team/UserFunctions'
// import {getProfileData} from './../Tables/Datas'
// import { Row } from 'reactstrap'

class ViewProfile extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      fileURL : '',
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
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  changeEditMode=()=>{
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    console.log("File onFormChange, file changed to = ");
    console.log(this.state.file);   
    formData.append('myImage',this.state.file);
    
    updateProfilePic(formData);
}
  onFormChange(e) {
    console.log(URL.createObjectURL(e.target.files[0]));  
    this.setState({file:e.target.files[0]});  
    this.setState({fileURL: URL.createObjectURL(e.target.files[0])}); 
    console.log("1234567890") 
    console.log(URL.createObjectURL(e.target.files[0]));                                                   
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }

  onUpdate(e){
    e.preventDefault()

    this.changeEditMode()
    
    const updatedUser = {
      firstname: this.state.first_name,
      lastname: this.state.last_name,
      email: this.state.email,
      // password: this.state.password,
      Joining_Date: this.state.joining,
      address: this.state.address,
      status: this.state.status,
      role: this.state.role,
      mobileno: this.state.mobile
    }

    update(updatedUser).then(res => {
      // this.props.history.push(`/profile`)
      console.log("Profile Updated Successful!")
    })
  }

  componentDidMount() {
    // const token = localStorage.usertoken
    const token = localStorage.getItem('token')
    fetchUserDetails(token, this.fetchedUser)
    // console.log("token check... = "+token);
    fetchUserPic(token, this.fetchedUserPic)
  }

  fetchedUser = (res, err) => {
    console.log("Component did mount me fetchUser")
    if(err) { this.props.history.push(`/login`) }
    else {
      // console.log("res.teamid = ")
      // console.log(res);
      this.setState({
        first_name: res.firstname,
        last_name: res.lastname,
        email: res.email,
        joining: res.Joining_Date,
        address: res.address,
        status: res.status,
        role: res.role,
        mobile: res.mobileno
      })
    }
  }

  fetchedUserPic = (res, err) => {
    console.log("Component did mount -> fetchUserPic")
    if(err) { this.props.history.push(`/login`) }
    else {
      // console.log("res.teamid = ")
      // console.log(res);
      this.setState({
        file:res.files[0],
        fileURL: URL.createObjectURL(res.files[0])
        // first_name: res.firstname
      })
    }
  }

  renderDefaultView=()=>{
    return (
      <div  className="animated fadeIn">
        <Row>
          <Col xs="12" sm="3">
          <FormGroup row>
            <div className="team-player">
              <img
                className="rounded-circle img-fluid img-raised"
                src={(this.state.fileURL==='' ? require('./avtar.jpg') : this.state.fileURL)}
                style={{height:"200px", width:"200px"}}
              ></img>
            </div>
            {/* <Col xs="12" md="9" style={{paddingTop: "40px"}}>
              <Input type="file" id="fmyImage" name="myImage" onChange= {this.onFormChange} /> <br/>
              <button type="submit" onClick={this.onFormSubmit}>Upload</button>
            </Col> */}
            
          </FormGroup>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Profile</strong>
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
                  className="btn btn-outline-primary"
                >
                  Update Profile
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
          <Col xs="12" sm="3">
          <FormGroup row>
            <div className="team-player">
              <img
                className="rounded-circle img-fluid img-raised"
                src={(this.state.fileURL==='' ? require('./avtar.jpg') : this.state.fileURL)}
                style={{height:"200px", width:"200px"}}
              ></img>
            </div>
            <Col xs="12" md="9" style={{paddingTop: "5px" }}>
              <Input type="file" id="fmyImage" name="myImage" onChange= {this.onFormChange} /> <br/>
              <button type="submit" onClick={this.onFormSubmit}>Upload</button>
            </Col>
            
          </FormGroup>
          </Col>
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
                    className="btn btn-outline-primary"
                    style={{justifyContent:"center", display:"flex"}}
                    onClick={this.onUpdate}
                >
                    UPDATE
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