import React, { Component } from 'react'
// import jwt_decode from 'jwt-decode'
import {fetchUserDetails} from './../Team/UserFunctions'
import {update} from './../Team/UserFunctions'
import {getProfileData} from './../Tables/Datas'

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
      gender: this.state.gender,
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

  renderEditView=()=>{
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6"> 
              <div className="col-sm-4 mx-auto">
                <h1 className="text-center">PROFILE</h1>
              </div>
              <form onSubmit={this.onUpdate}>
                <table className="table col-md-4 mx-auto">
                  <tbody>
                    <tr>
                      <td>First Name:</td>
                      <input type="text" name="first_name" value={this.state.first_name} onChange={this.onChange} defaultValue={this.state.first_name}/>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <input type="text" name="last_name" value={this.state.last_name} onChange={this.onChange} defaultValue={this.state.last_name}/>
                    </tr>
                    {/* <tr>
                      <td>Gender:</td>
                      <td>{this.state.gender}</td>
                    </tr> */}
                    <tr>
                      <td>Email:</td>
                      <td>{this.state.email}</td>
                    </tr>
                    {/* <tr>
                      <td>Password:</td>
                      <input type="password" name="password" value={this.state.password} onChange={this.onChange} defaultValue={this.state.password}/>
                    </tr> */}
                    <tr>
                      <td>Joining:</td>
                      <td>{this.state.joining}</td>
                    </tr>
                    <tr> 
                      <td>Address:</td>
                      <input type="text" name="address" value={this.state.address} onChange={this.onChange} defaultValue={this.state.address}/>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>{this.state.status}</td>
                    </tr>
                    <tr>
                      <td>Role:</td>
                      <td>{this.state.role}</td>
                    </tr>
                    <tr>
                      <td>Mobile:</td>
                      <input type="text" name="mobile" value={this.state.mobile} onChange={this.onChange} defaultValue={this.state.mobile}/>
                    </tr>
                  </tbody>
                </table>
                <button
                    type="submit"
                    className="btn btn-sm btn-outline-primary btn-block"
                    style={{justifyContent:"center", display:"flex"}}
                >
                    Update!
                </button>
              </form>
            </div>
            <div className="col-sm-3"></div>
          </div>  
        </div>
      </div>
    )

  }

  renderDefaultView=()=>{
    return (
      <div className="container">
        <div className="jumbotron mt-5">
        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fisrt Name:</td>
                <td>{this.state.first_name}</td>
              </tr>
              {<tr>
                <td>Last Name:</td>
                <td>{this.state.last_name}</td>
              </tr>}
              {/* <tr>
                <td>Gender:</td>
                <td>{this.state.gender}</td>
              </tr> */}
              <tr>
                <td>Email:</td>
                <td>{this.state.email}</td>
              </tr>
              {/* <tr>
                <td>Password:</td>
                <td>{this.state.password}</td>
              </tr> */}
              <tr>
                <td>Joining:</td>
                <td>{this.state.joining}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{this.state.address}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{this.state.status}</td>
              </tr>
              <tr>
                <td>Role:</td>
                <td>{this.state.role}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{this.state.mobile}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.changeEditMode}
            className="btn btn-sm btn-outline-primary btn-block">update profile</button>
        </div>
        <div className="col-sm-3"></div>
          </div>  
        </div>
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