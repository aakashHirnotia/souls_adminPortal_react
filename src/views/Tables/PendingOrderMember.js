import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { PendingOrderData } from "./Datas";

const Label = {
    Order_ID: "Order ID",
    customer_ID:"Customer ID",
    souls_ID:"Souls ID",
    customer_name:"Name",
    no_of_therapists_required:"No of Therapists required",
    therapist_gender:"Therapist Gender",
    massage_for:"Massage for",
    slot_time:"Slot Time",
    slot_date:"Slot Date",
    massage_duration:"Massage Duration",
    address:"Address",
    pincode:"Pincode",
    mobile_no:"Mobile No",
    latitude: "Latitude",
    longitude: "Longitude",
    create_at: "Create Time",
    is_order_confermed: "Is Order Confermed",
    transaction_ID: "Transaction ID",
    total_order_amount:"Total Order Amount",
}

class PendingOrderMember extends Component {
  componentWillMount() {
    if(PendingOrderData.length==0) {
      window.location.href='/pendingorder/list'
    }
  }

  render() {
    const pendingorder = PendingOrderData.find(
      pendingorder => pendingorder.Order_ID.toString() === this.props.match.params.Order_ID
    );
    const pendingOrderDetails = pendingorder
      ? Object.entries(pendingorder)
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
                  <i className="icon-info pr-1"></i>PendingOrder Member:{" "}
                  {pendingorder.customer_name}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {pendingOrderDetails.map(([key, value]) => {
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

export default PendingOrderMember;
