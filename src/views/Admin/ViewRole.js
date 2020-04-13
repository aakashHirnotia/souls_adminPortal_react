import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import RoleData from './RoleData'

function RoleRow(props) {
    const role = props.role
  
    return (
      <tr key={role.RoleID.toString()}>
        <td>{role.RoleID}</td>
        <td>{role.Role}</td>
        <td>{role.RoleStatus}</td>
      </tr>
    )
  }

class Role extends Component {
    render() {

        const roleList = RoleData.filter((role) => role.RoleID < 10)
    
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12} style={{padding:"10"}}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Role <small className="text-muted">Members</small>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
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