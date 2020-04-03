import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import Pages from './../Pagination/Pages'
import TeamData from './TeamData'

import {teamList} from './UserFunctions'

function TeamRow(props) {
    const team = props.team
    const teamLink = `/team/view-member/${team.id}`
  
    const getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
          //status === 'Pending' ? 'warning' :
            status === 'Deleted' ? 'danger' :
              'primary'
    }
  
    return (
      <tr key={team.id.toString()}>
        <th>{team.id}</th>
        <td style={{width: "10%"}}><Link to={teamLink}>{team.firstname}</Link></td>
        <td style={{width: "10%"}}>{team.lastname}</td>
        <td>{team.email}</td>
        <td>{team.mobileno}</td>
        {/* <td>{team.registered}</td> */}
        <td style={{width: "12%"}}>{team.Joining_Date}</td>
        <td>{team.role}</td>
        <td style={{width: "20%"}}>{team.address}</td>
        <td><Badge color={getBadge(team.status)}>{team.status}</Badge></td>
      </tr>
    )
  }

class ViewTeam extends Component {
  state = {
    data:[]
  }

  async componentDidMount() {
    // console.log(Date.now())
    const dataRecieved = await teamList()
    // console.log(Date.now())
    // console.log("HERE: ")
    // console.log(dataRecieved)
    this.setState({data: dataRecieved})
  }

    render() {
      console.log('DAta: ')
      console.log(this.state.data.forEach(o=>console.log(o)))
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
                          <th scope="col">id</th>
                          <th scope="col">first name</th>
                          <th scope="col">last name</th>
                          <th scope="col">email</th>
                          <th scope="col">mobile</th>
                          {/* <th scope="col">registered</th> */}
                          <th scope="col">joining date</th>
                          <th scope="col">role</th>
                          <th scope="col">address</th>
                          <th scope="col">status</th>
                        </tr>
                      </thead>
                        <tr>
                          
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                          <td scope="col">
                            <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}}/>
                          </td>
                        </tr>
                      <tbody>
                        {this.state.data && this.state.data.map((team, index) =>
                          <TeamRow key={index} team={team}/>
                        )}
                      </tbody>
                    </Table>
                    <Pages />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )
      }
    }
 
export default ViewTeam;