import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
// import {BrowserRouter} from 'react-router-dom'
import { TransactionData } from "../Datas";
import { Link } from "react-router-dom";

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
    merchant_transaction_id: "Merchant transaction ID",
    payment_gateway_mode: "Payment Gateway Mode",
    transaction_mode: "Transaction Mode",
    bank_type: "Bank Type",
    payment_gateway_id: "Payment Gateway ID",
    total_order_amount:"Total Order Amount",
}

class TransactionMember extends Component {
  componentWillMount() {
    if(TransactionData.length==0) {
      window.location.href='/transactions'
    }
  }

  render() {
    const transaction = TransactionData.find(
      transaction => transaction.order_id.toString() === this.props.match.params.id
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
                  {transaction.customer_name + " / deatils"}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/transactions">
                    Back
                  </a>
                </button>
                {/* <Link to={`/transaction/edit-member/${transaction.order_id}`}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ position: "absolute", right: "70px" }}
                  >
                    Update Transaction
                  </button>
                </Link> */}
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
