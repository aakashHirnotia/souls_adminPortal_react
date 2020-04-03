import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import TeamHasRoleData from './TeamHasRoleData'

function TeamHasRoleRow(props) {
    const teamHasRole = props.teamHasRole
  
    return (
      <tr key={teamHasRole.id.toString()}>
        <th>{teamHasRole.id}</th>
        <td>{teamHasRole.TeamID}</td>
        <td>{teamHasRole.Status}</td>
        <td>{teamHasRole.CreatedTime}</td>
        <td>{teamHasRole.UpdatedTime}</td>
      </tr>
    )
  }

class TeamHasRole extends Component {
    render() {

        const teamHasRoleList = TeamHasRoleData.filter((teamHasRole) => teamHasRole.id < 10)
    
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12} style={{padding:"5"}}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Team Has Role <small className="text-muted">Members</small>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">Team ID</th>
                          <th scope="col">Status</th>
                          <th scope="col">Created Time</th>
                          <th scope="col">Updated Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamHasRoleList.map((teamHasRole, index) =>
                          <TeamHasRoleRow key={index} teamHasRole={teamHasRole}/>
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
 
export default TeamHasRole;