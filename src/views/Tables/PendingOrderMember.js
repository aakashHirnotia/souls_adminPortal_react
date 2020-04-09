import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
// import {BrowserRouter} from 'react-router-dom'
import { PendingOrderData } from "./Datas";

const Label = {
    order_id: "Order ID",
    customer_id:"Customer ID",
    customer_souls_id:"Souls ID",
    customer_name:"Name",
    number_of_therapist:"No of Therapists required",
    therapist_gender:"Therapist Gender",
    massage_for:"Massage for",
    Slot_Time:"Slot Time",
    Slot_Date:"Slot Date",
    massage_duration:"Massage Duration",
    customer_address:"Address",
    pincode:"Pincode",
    // mobile_no:"Mobile No",
    latitude: "Latitude",
    longitude: "Longitude",
    CreatedAt: "Create Time",
    is_order_confirmed: "Is Order Confermed",
    merchant_transaction_id: "Transaction ID",
    total_order_amount:"Total Order Amount",
}

class PendingOrderMember extends Component {
  componentWillMount() {
    if(PendingOrderData.length==0) {
      window.location.href='/customers/booking/list'
    }
  }

  render() {
    const PendingOrder = PendingOrderData.find(
      PendingOrder => PendingOrder.order_id.toString() === this.props.match.params.id
    );
    const pendingOrderDetails = PendingOrder
      ? Object.entries(PendingOrder)
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
                  {PendingOrder.customer_name}
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
