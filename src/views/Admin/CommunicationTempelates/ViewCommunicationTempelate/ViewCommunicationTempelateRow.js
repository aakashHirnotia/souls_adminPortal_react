
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { CommTempelateData, SetCommTempelateData } from "../Data";
import Pagination from "react-js-pagination";
import { communicationTempelateList, searchCommunicationTempelate } from "../../AdminFunctions";


class ViewCommunicationTempelateRow extends Component {
    state = {
      communicationTempelate: this.props.communicationTempelate
    };
  
    componentWillReceiveProps(nextProps) {
      this.setState({communicationTempelate: this.props.communicationTempelate})
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
  
    getTitle = (status) => {
      return  (status === 'Active' || status === 'active')  ? "active" :
              (status === 'Inactive' || status === 'inactive') ? "inactive" :
              "not defined"
    }
  
    render() {
      return (
        <tr key={this.state.communicationTempelate.communicationTempelateID}>
          <td>
            <Link to={`/admin/view-communication-tempelate/${this.props.communicationTempelate.communicationTempelateID}`}>
              <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
            </Link>{" "}
            <Link
              style={{ paddingLeft: "14px" }}
              to={`/admin/edit-communication-tempelate/${this.props.communicationTempelate.communicationTempelateID}`}
            >
              <i className="fa fa-pencil" data-toggle="tooltip" title="edit"></i>
            </Link>
          </td>
          <th>{this.state.communicationTempelate.communicationTempelateID}</th>
          <td>{this.state.communicationTempelate.type}</td>
          <td>{this.state.communicationTempelate.trigger_time}</td>
          <td>{this.state.communicationTempelate.trigger_for}</td>
          <td>{this.state.communicationTempelate.smsContent}</td>
          <td>{this.state.communicationTempelate.subject}</td>
          <td>{this.state.communicationTempelate.emailContent}</td>
          <td className={this.getIcon(this.state.communicationTempelate.status)} style={this.getColor(this.state.communicationTempelate.status)} data-toggle="tooltip" title={this.getTitle(this.state.communicationTempelate.status)}></td>
        </tr>
      );
    }
  }
  

export default ViewCommunicationTempelateRow;