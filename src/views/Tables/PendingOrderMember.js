import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { PendingOrderData } from "./Datas";

const Label = {
    order_id: "Order ID",
    customer_id:"Customer ID",
    customer_souls_id:"Souls ID",
    customer_name:"Name",
    number_of_therapist:"No of Therapists required",
    therapist_gender:"Therapist Gender",
    massage_for:"Massage for",
    slot_time:"Slot Time",
    slot_date:"Slot Date",
    massage_duration:"Massage Duration",
    customer_address:"Address",
    pincode:"PIN Code",
    latitude: "Latitude",
    longitude: "Longitude",
    created_at: "Create Time",
    is_order_confirmed: "Order Status",
    merchant_transaction_id: "Transaction ID",
    total_order_amount:"Total Order Amount",
}

class PendingOrderMember extends Component {
  componentWillMount() {
    if(PendingOrderData.length==0) {
      window.location.href='/tables/pendingOrders'
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
                <button 
                      className="btn btn-primary-primary" style={{position:"absolute", right:"20px"}}
                >
                  <a className="createCustomerBtn" href="/tables/pendingOrders"> Back </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {pendingOrderDetails.map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>{`${Label[key]}:`}</td>
                          <td>
                            <strong>                              
                              {(value === true) ? "True" :
                              (value === false) ? "False" :
                               value}
                              </strong>
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
