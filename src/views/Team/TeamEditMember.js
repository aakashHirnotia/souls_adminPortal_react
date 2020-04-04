import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import {TeamData} from './TeamData'

class TeamMember extends Component {


  renderComponent = () => {
    
  }

  render() {

    const team = TeamData.find( team => team.id.toString() === this.props.match.params.id)

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
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                      <div className="col-md-4">
                          <FormGroup>
                              <Label htmlFor="first name">First Name</Label>
                              <Input type="text" id="first name" placeholder="First name" name="first_name" value={this.state.first_name}  onChange={this.onChange} />
                              <div style={{fontSize: 10, color: "red"}}>
                                {this.state.first_nameError}
                              </div>
                          </FormGroup>
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
                      </div>
                      </div>
                    </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TeamMember;
