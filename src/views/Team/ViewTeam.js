import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import PasswordPopUp from './PasswordPopUp.js'
import TeamData from './TeamData'

function TeamRow(props) {
    const team = props.team
    const teamLink = `/team/view-member/${team.id}`
    var popUpShow = false;

    const getBadge = (status) => {
      return status === 'Active' ? 'success' :
        status === 'Inactive' ? 'secondary' :
            status === 'Deleted' ? 'danger' :
              'primary'
    }
    const popUpClose = () => {
      popUpShow= false;
    }
  
    return (
      <tr key={team.id.toString()}>
        <th>{team.id}</th>
        {/* <th scope="row"><Link to={teamLink}>{team.id}</Link></th> */}
        <td style={{width: "10%"}}>{team.firstname}</td>
        <td style={{width: "10%"}}>{team.lastname}</td>
        <td>{team.email}</td>
        <td>{team.mobile}</td>
        {/* <td>{team.registered}</td> */}
        <td style={{width: "12%"}}>{team.joining}</td>
        <td>{team.role}</td>
        <td style={{width: "20%"}}>{team.address}</td>
        <td><Badge color={getBadge(team.status)}>{team.status}</Badge></td>
        <td>
          <Link to={teamLink}><i className="fa fa-eye"></i></Link>
          <Link style={{padding:"10px"}} onClick={this.popUpClose}><i className="fa fa-key"></i></Link> <br />
          <Link style={{paddingLeft:"14px"}} to={teamLink}><i className="fa fa-pencil"></i></Link>
        </td>

      </tr>
    )
  }

class ViewTeam extends Component {
    render() {

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
                        {teamList.map((team, index) =>
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