import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { CommTempelateData } from "./Data";

const Label = {
  templ_id: "Communication Tempelate ID",
  templ_type: "Type",
  trigger_time: "Trigger Time",
  trigger_for: "Trigger For",
  sms_content: "SMS Content",
  subject: "Subject",
  email_content: "Email Content",  
  status: "Status"
  
}

class CommTempelateMember extends Component {
  componentWillMount() {
    if(CommTempelateData.length==0) {
      window.location.href='/admin/CommunicationTempelate'
    }
  }

  render() {
    const communicationTempelate = CommTempelateData.find(
        communicationTempelate => communicationTempelate.templ_id.toString() === this.props.match.params.id
    );
    const communicationTempelateDetails = communicationTempelate
      ? Object.entries(communicationTempelate)
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
                  <i className="icon-info pr-1"></i>Communication Tempelate:{" "}
                  {communicationTempelate.templ_id}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/admin/CommunicationTempelate">
                    Back
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {communicationTempelateDetails.map(([key, value]) => {
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

export default CommTempelateMember;
