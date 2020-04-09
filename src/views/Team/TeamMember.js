import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { TeamData, TeamDatas } from "./TeamData";

const Label = {
  teamid: "Team ID",
  firstname: "First Name",
  lastname: "Last Name",
  email: "Email Address",
  address: "Address",
  // role: "Role",
  mobileno: "Mobile No.",  
  status: "Status",
  Joining_Date: "Joining Date"
  
}

class TeamMember extends Component {
  componentWillMount() {
    if(TeamData.length==0) {
      window.location.href='/team/list'
    }
  }

  render() {
    const team = (TeamData.length !== 0 ? TeamData : TeamDatas).find(
      team => team.teamid.toString() === this.props.match.params.id
    );
    const teamDetails = team
      ? Object.entries(team)
      : [
          [
            "id",
            <span>
              <i className="text-muted icon-ban"></i> Not found
            </span>
          ]
        ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Team Member:{" "}
                  {team.firstname+" "+team.lastname}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {teamDetails.map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>{`${Label[key]}:`}</td>
                          <td>
                            <strong>{value}</strong>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeamMember;
