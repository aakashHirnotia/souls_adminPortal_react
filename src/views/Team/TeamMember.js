import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { TeamData, TeamDatas } from "./TeamData";

const Label = {
  teamid: "Team ID",
  firstname: "First Name",
  lastname: "Last Name",
  email: "Email Address",
  address: "Address",
  role: "Role",
  mobileno: "Mobile No.",
  status: "Status",
  joining_date: "Joining Date",
  gender: "Gender",
};

class TeamMember extends Component {
  componentWillMount() {
    if (TeamData.length == 0) {
      window.location.href = "/team/list";
    }
  }

  render() {
    const team = (TeamData.length !== 0 ? TeamData : TeamDatas).find(
      (team) => team.teamid.toString() === this.props.match.params.id
    );
    const teamDetails = team
      ? Object.entries(team)
      : [
          [
            "id",
            <span>
              <i className="text-muted icon-ban"></i> Not found
            </span>,
          ],
        ];
    console.log(teamDetails);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Team Member:{" "}
                  {team.firstname + " " + team.lastname}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <Link className="createTeamBtn" to="/team/list">
                    Back
                  </Link>
                </button>
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
