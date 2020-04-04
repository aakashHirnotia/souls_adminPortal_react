import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

<<<<<<< HEAD
import {TeamDatas} from './TeamData'
=======
import {TeamData} from './TeamData'
>>>>>>> f0ed36d720ba0e233fa38ad5cbe60ebf15448a1b

class TeamMember extends Component {

  render() {

<<<<<<< HEAD
    const team = TeamDatas.find( team => team.id.toString() === this.props.match.params.id)
=======
    const team = TeamData.find( team => team.teamid.toString() === this.props.match.params.id)
>>>>>>> f0ed36d720ba0e233fa38ad5cbe60ebf15448a1b

    const teamDetails = team ? Object.entries(team) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Team id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        teamDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
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

export default TeamMember;
