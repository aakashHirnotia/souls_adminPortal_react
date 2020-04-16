import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
// import { customerData, SetCustomerData } from "../../Datas";
// import Pagination from "react-js-pagination";
// import { customerList, searchCust } from "../../Functions";


class CustomerRow extends Component {
    state = {
      customer: this.props.customer
    };
  
    componentWillReceiveProps(nextProps) {
      this.setState({customer: this.props.customer})
    }
  
    getIcon = (status) => {
      return  (status === 'Active' || status === 'active') ? 'fa fa-check-square fa-lg' :
              (status === 'Inactive' || status === 'inactive') ? 'fa fa-window-close-o fa-lg' :
              'primary'
    }
  
    getColor = (status) => {
      return  (status === 'Active' || status === 'active')  ? {color:"green"} :
              (status === 'Inactive' || status === 'inactive') ? {color:"red"} :
              {color:"black"}
    }
  
      render() {
        // console.log(this.props.customer)
        return (
          <tr key={this.state.customer.customer_souls_id}>
            <td>
              <Link to={`/customer/view-member/${this.props.customer.customer_id}`}>
                <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
              </Link>
              <Link
                style={{ paddingLeft: "10px" }}
                to={`/customer/edit-member/${this.props.customer.customer_id}`}
              >
                <i className="fa fa-pencil" data-toggle="tooltip" title="update"></i>
              </Link>
            </td>
            <th style={{ width: "12%" }}>{this.state.customer.customer_souls_id}</th>
            <td style={{ width: "15%" }}>{this.state.customer.customer_name}</td>
            <td style={{ width: "15%" }}>{this.state.customer.customer_mobile_no}</td>
            <td style={{ width: "10%" }}>{this.state.customer.customer_gender}</td>
            <td style={{ width: "10%" }}>{this.state.customer.customer_email}</td>
            <td style={{ width: "10%" }}>{this.state.customer.pincode}</td>
            <td style={{ width: "10%" }}>{this.state.customer.created_at}</td>
            <td className={this.getIcon(this.state.customer.status)} style={this.getColor(this.state.customer.status)}></td>
          </tr>
        );
      }
    }
  
    export default CustomerRow