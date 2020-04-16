import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { PartnerData} from "./Datas";

const Label = {
    partner_id: "ID",
    partner_souls_id: "SOULS ID",
    partner_name: "Name",
    partner_email: "Email",
    partner_mobileno: "Mobile No.",
    partner_address: "Address",
    pincode: "Pincode",
    latitude: "Latitude",
    longitude: "Longitude",
    rate: "Per Visit Price Commission",
    commission_type: "Commission Type",
    onboard_date: "Onboard Date",
    updated_at: "Updated At",
    created_at: "Created At",
    created_by: "Created By",
    updated_by: "Updated By",
    partner_gender: "Gender",
  
}

class PartnersMember extends Component {
  componentWillMount() {
    if(PartnerData.length==0) {
      window.location.href='/tables/ViewPartners'
    }
  }

  render() {
    const partner = PartnerData.find(
      partner => partner.partner_id.toString() === this.props.match.params.id
    );
    const partnerDetails = partner
      ? Object.entries(partner)
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
                  <i className="icon-info pr-1"></i>Partner:{" "}
                  {partner.partner_name}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/tables/ViewPartners">
                    Back
                  </a>
                </button>  
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {partnerDetails.map(([key, value]) => {
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

export default PartnersMember;
