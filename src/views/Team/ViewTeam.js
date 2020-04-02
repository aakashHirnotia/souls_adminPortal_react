import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import TeamData from './TeamData'

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
        {/* <th scope="row"><Link to={teamLink}>{team.id}</Link></th> */}
        <td style={{width: "10%"}}><Link to={teamLink}>{team.firstname}</Link></td>
        <td style={{width: "10%"}}>{team.lastname}</td>
        <td>{team.email}</td>
        <td>{team.mobile}</td>
        <td>{team.registered}</td>
        <td style={{width: "12%"}}>{team.joining}</td>
        <td>{team.role}</td>
        <td style={{width: "20%"}}>{team.address}</td>
        <td><Badge color={getBadge(team.status)}>{team.status}</Badge></td>
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
                          <th scope="col">id</th>
                          <th scope="col">first name</th>
                          <th scope="col">last name</th>
                          <th scope="col">email</th>
                          <th scope="col">mobile</th>
                          <th scope="col">registered</th>
                          <th scope="col">joining date</th>
                          <th scope="col">role</th>
                          <th scope="col">address</th>
                          <th scope="col">status</th>
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