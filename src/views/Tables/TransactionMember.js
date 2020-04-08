import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
// import {BrowserRouter} from 'react-router-dom'
import { TransactionData } from "./Datas";

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
    latitude: "Latitude",
    longitude: "Longitude",
    create_at: "Create Time",
    merchant_transaction_ID: "Merchant transaction ID",
    payment_gateway_mode: "Payment Gateway Mode",
    transaction_mode: "Transaction Mode",
    bank_type: "Bank Type",
    payment_gateway_ID: "Payment Gateway ID",
    total_order_amount:"Total Order Amount",
}

class TransactionMember extends Component {
  componentWillMount() {
    if(TransactionData.length==0) {
      window.location.href='/transaction/list'
    }
  }

  render() {
    const transaction = TransactionData.find(
      transaction => transaction.Order_ID.toString() === this.props.match.params.Order_ID
    );
    const transactionDetails = transaction
      ? Object.entries(transaction)
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
                  <i className="icon-info pr-1"></i>Transaction Member:{" "}
                  {transaction.customer_name}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {transactionDetails.map(([key, value]) => {
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

export default TransactionMember;
