import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {BrowserRouter} from 'react-router-dom'
import { customerData} from "../Datas";
import { Link } from "react-router-dom";

const Label = {
    customer_id: "Customer ID",
    customer_souls_id: "Souls ID",
    customer_name: "Name",
    customer_mobile_no: "Mobile No",
    customer_gender: "Gender",
    customer_email: "Email",
    customer_address: "Address",
    pincode: "PIN Code",
    created_at: "Create Time",
    registered_source: "Registration Source",
    last_access_time: "Last Access Time",
    status: "Status",
}

class CustomerMember extends Component {
  componentWillMount() {
    if(customerData.length==0) {
      window.location.href='/customers'
    }
  }

  render() {
    const customer = customerData.find(
      customer => customer.customer_id.toString() === this.props.match.params.id
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
                  {customer.customer_name + " / details"}
                </strong>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/customers">
                    Back
                  </a>
                </button>
                {/* <Link to={`/customer/edit-member/${customer.customer_id}`}>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ position: "absolute", right: "70px" }}
                  >
                    Update Member
                  </button> */}
                {/* </Link> */}
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {customerDetails.map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>{`${Label[key]}:`}</td>
                          {/* {console.log(Label[key])} */}
                          <td>
                            <strong>
                              {(value === true) ? "True" :
                              (value === false) ? "False" :
                               value}
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

export default CustomerMember;
