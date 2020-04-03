import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import PasswordPopUp from './PasswordPopUp.js'
import TeamData from './TeamData'

import {teamList} from './UserFunctions'


class TeamRow extends Component{
    state = {
      showModal: false,
      team: this.props.team,
    }

    getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
            status === 'Deleted' ? 'danger' :
              'primary'
      }


      displayModal = () => {
        this.setState({showModal: true})
      }

      closeModal = () => {
        this.setState({showModal: false})
      }
    render() {
    return (
      <tr key={this.state.team.teamid}>
        <th>{this.state.team.teamid}</th>
        <td style={{width: "10%"}}>{this.state.team.firstname}</td>
        <td style={{width: "10%"}}>{this.state.team.lastname}</td>
        <td>{this.state.team.email}</td>
        <td>{this.state.team.mobileno}</td>
        {/* <td>{this.state.team.registered}</td> */}
        <td style={{width: "12%"}}>{this.state.team.Joining_Date}</td>
        <td>{this.state.team.role}</td>
        <td style={{width: "20%"}}>{this.state.team.address}</td>
        <td><Badge color={this.getBadge(this.state.team.status)}>{this.state.team.status}</Badge></td>
        <td>
          <Link to={`/team/view-member/${this.props.team.id}`}><i className="fa fa-eye"></i></Link>
          <Link style={{padding:"10px"}} onClick={this.displayModal}><i className="fa fa-key"></i></Link> <br />
          <Link style={{paddingLeft:"14px"}} to={`/team/edit-member/${this.props.team.id}`}><i className="fa fa-pencil"></i></Link>
        </td>
        <PasswordPopUp email={this.state.team.email} show={this.state.showModal} handleClose={this.closeModal}/>
      </tr>
    )
  }

  }








class ViewTeam extends Component {
  state = {
    data:[],
    showModal: false
  }

  // async componentDidMount() {
  //   // console.log(Date.now())
  //   const dataRecieved = await teamList()
  //   // console.log(Date.now())
  //   // console.log("HERE: ")
  //   // console.log(dataRecieved)
  //   this.setState({data: dataRecieved})
  // }


    render() {
      // console.log('DAta: ')
      // console.log(this.state.data.forEach(o=>console.log(o)))
        const teamList = TeamData.filter((team) => team.id < 10)
    
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12} style={{padding:"0"}}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Team <small className="text-muted">Members</small>
                    <button 
                      className="btn btn-primary btn-sm"
                      style={{position:"absolute", right:"20px"}}
                    >
                      <a className="createTeamBtn" href="/team/add-member">
                      Create Team
                      </a>
                    </button>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          {/* <th scope="col">Registered</th> */}
                          <th scope="col">Joining Date</th>
                          <th scope="col">Role</th>
                          <th scope="col">Address</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {this.state.data && this.state.data.map((team, index) => */}
                        {teamList.map((team, index)=>
                          <TeamRow key={index} team={team}/>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )
      }
    }
 
export default ViewTeam;