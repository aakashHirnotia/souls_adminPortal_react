import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { AssignPartnerData} from "./Datas";

const Label = {
    id: "ID",
    customer_souls_id: "Customer SOULS ID",
    customer_name: "Customer Name",
    customer_mobile_no: "Customer Mobile No",
    customer_gender: "Customer Gender",
    Slot_Time:"Slot Time",
    Slot_Date:"Slot Date",
    customer_address: "Customer Address",
    pincode: "PIN Code",
    merchant_transaction_id: "Merchant TXN ID",
    partner_souls_id:"Partner SOULS ID",
    partner_name:"Partner Name",
    aprtner_mobileno: "Partner Mobile No",
    Commission_Type:"Commission Type",
    commission_amount:"Commission Amount",
    CreatedAt: "Create Time",
    created_by:"Created By",
    updated_by:"Update By",
    status: "Status",
}

class AssignPartnerMember extends Component {
  componentWillMount() {
    if(AssignPartnerData.length==0) {
      window.location.href='/tables/assignPartners'
    }
  }

  render() {
    const assignPartner = AssignPartnerData.find(
      assignPartner => assignPartner.id.toString() === this.props.match.params.id
    );
    const AssignPartnerDetails = assignPartner
      ? Object.entries(assignPartner)
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
                  <i className="icon-info pr-1"></i>Assign Partner Member:{" "}
                  {assignPartner.customer_name}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/tables/assignPartners">
                    Back
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {AssignPartnerDetails.map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>{`${Label[key]}:`}</td>
                          {/* {console.log(Label[key])} */}
                          <td>
                            <strong>
                               {value}
                            </strong>
                          {/* {console.log("value is "+value)} */}
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

export default AssignPartnerMember;
