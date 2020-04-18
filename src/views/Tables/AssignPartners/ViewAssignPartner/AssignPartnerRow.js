import React, { Component } from "react";
import { Link } from "react-router-dom";

class AssignPartnerRow extends Component {
    state = {
      assignPartner: this.props.assignPartner
    };
  
    componentWillReceiveProps(nextProps) {
      this.setState({assignPartner: this.props.assignPartner})
    }
  
    getIcon = (status) => {
      return  (status === 'Pending' || status === 'pending') ? 'fa fa-check-square fa-lg' :
              (status === 'Accepted' || status === 'accepted') ? 'fa fa-window-close-o fa-lg' :
              (status === 'Attended' || status === 'attended') ? 'fa fa-trash' :
              (status === 'Cancelled' || status === 'cancelled') ? 'fa fa-trash' :
              (status === 'Rejected' || status === 'rejected') ? 'fa fa-trash' :
              'primary'
    }
  
    getColor = (status) => {
      return  (status === 'Pending' || status === 'pending') ? {color:"yellow"}:
              (status === 'Accepted' || status === 'accepted') ? {color:"green"} :
              (status === 'Attended' || status === 'attended') ? {color:"green"} :
              (status === 'Cancelled' || status === 'cancelled') ? {color:"red"} :
              (status === 'Rejected' || status === 'rejected') ? {color:"red"} :
              {color:"black"}
    }
  
      render() {
        return (
          <tr key={this.state.assignPartner.customer_souls_id}>
            <td>
              <Link to={`/assignpartner/view-member/${this.props.assignPartner.id}`}>
                <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
              </Link>
              <Link
                style={{ paddingLeft: "10px" }}
                to={`/assignpartner/edit-member/${this.props.assignPartner.id}`}
              >
                <i className="fa fa-pencil" data-toggle="tooltip" title="update"></i>
              </Link>
            </td>
            <th style={{ width: "12%" }}>{this.state.assignPartner.customer_souls_id}</th>
            <td style={{ width: "15%" }}>{this.state.assignPartner.customer_name}</td>
            <td style={{ width: "15%" }}>{this.state.assignPartner.customer_mobile_no}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.slot_time}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.slot_date}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.partner_souls_id}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.partner_name}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.partner_mobileno}</td>
            <td style={{ width: "10%" }}>{this.state.assignPartner.created_at}</td>
            <td className={this.getIcon(this.state.assignPartner.status)} style={this.getColor(this.state.assignPartner.status)}></td>
          </tr>
        );
      }
    }

    export default AssignPartnerRow;
    