import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
// import { PartnerData, SetPartnerData } from "../../Datas";
// import Pagination from "react-js-pagination";
// import { partnerList, searchPartner } from "../../Functions";


class PartnerRow extends Component {
    state = { 
      partner: this.props.partner
    };
  
    componentWillReceiveProps(nextProps) {
      this.setState({partner: this.props.partner})
    }
  
    render() {
      return (
        <tr key={this.state.partner.partner_souls_id}>
          <td>
            <Link to={`/view-partner-member/${this.props.partner.partner_id}`}>
              <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
            </Link>{" "}
            <Link
              style={{ paddingLeft: "14px" }}
              to={`/edit-partner/${this.props.partner.partner_id}`}
            >
              <i className="fa fa-pencil" data-toggle="tooltip" title="edit"></i>
            </Link>
          </td>
          <th>{this.state.partner.partner_souls_id}</th>
          <td>{this.state.partner.partner_name}</td>
          <td>{this.state.partner.partner_email}</td>
          <td>{this.state.partner.partner_mobileno}</td>
          <td>{this.state.partner.pincode}</td>
          <td>{this.state.partner.rate}</td>
          <td>{this.state.partner.commission_type}</td>
          {/* <td>{this.state.partner.updated_at}</td> */}
          <td>{this.state.partner.created_at}</td>
          <td>{this.state.partner.partner_gender}</td>
        </tr>
      );
    }
  }
  
  export default PartnerRow