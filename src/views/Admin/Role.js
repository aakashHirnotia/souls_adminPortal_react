import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import RoleData from './RoleData'

function RoleRow(props) {
    const role = props.role
    //const teamLink = `/team/view-member/${team.id}`
  
    // const getBadge = (status) => {
    //   return status === 'Active' ? 'success' :
    //     status === 'Inactive' ? 'secondary' :
    //         status === 'Deleted' ? 'danger' :
    //           'primary'
    // }
  
    return (
      <tr key={role.id.toString()}>
        <th>{role.id}</th>
        <td>{role.RoleID}</td>
        <td>{role.Role}</td>
        <td>{role.RoleStatus}</td>
        {/* <td style={{width: "12%"}}>{team.joining}</td>
        <td>{team.role}</td>
        <td style={{width: "20%"}}>{team.address}</td>
        <td><Badge color={getBadge(team.status)}>{team.status}</Badge></td> */}
      </tr>
    )
  }

class Role extends Component {
    render() {

        const roleList = RoleData.filter((role) => role.id < 10)
    
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12} style={{padding:"5"}}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Role <small className="text-muted">Members</small>
                    {/* <button 
                      className="btn btn-primary btn-sm"
                      style={{position:"absolute", right:"20px"}}
                    >
                      <a className="createTeamBtn" href="/team/add-member">
                      Create Team
                      </a>
                    </button> */}
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">Role ID</th>
                          <th scope="col">Role Name</th>
                          <th scope="col">Role Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roleList.map((role, index) =>
                          <RoleRow key={index} role={role}/>
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
 
export default Role;