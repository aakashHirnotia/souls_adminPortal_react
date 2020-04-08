import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { customerData} from "./Datas";

const Label = {
    id: "ID",
    soulsID: "Souls ID",
    name: "Name",
    mobileno: "Mobile No",
    gender: "Gender",
    email: "Email",
    address: "Address",
    pincode: "Pincode",
    createtime: "Create Time",
    registrationsource: "Registration Source",
    lastaccesstime: "Last Access Time",
    status: "Status",
}

class CustomerMember extends Component {
  componentWillMount() {
    if(customerData.length==0) {
      window.location.href='/customer/list'
    }
  }

  render() {
    const customer = customerData.find(
      customer => customer.id.toString() === this.props.match.params.id
    );
    const customerDetails = customer
      ? Object.entries(customer)
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
                  <i className="icon-info pr-1"></i>Customer Member:{" "}
                  {customer.name}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {customerDetails.map(([key, value]) => {
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

export default CustomerMember;
