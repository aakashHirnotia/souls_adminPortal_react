import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

class PendingOrderRow extends Component {
    state = {
      PendingOrder: this.props.PendingOrder
    };
    componentWillReceiveProps(nextProps) {
      this.setState({PendingOrder: this.props.PendingOrder})
    }

    getIcon = (is_order_confirmed) => {
      return  (is_order_confirmed === 'Confirmed' || is_order_confirmed === 'confirmed') ? 'fa fa-check-square fa-lg' :
              (is_order_confirmed === 'Pending' || is_order_confirmed === 'pending') ? 'fa fa-window-close-o fa-lg' :
              'primary'
    }
  
    getColor = (is_order_confirmed) => {
      return  (is_order_confirmed === 'Confirmed' || is_order_confirmed === 'confirmed')  ? {color:"green"} :
              (is_order_confirmed === 'Pending' || is_order_confirmed === 'pending') ? {color:"red"} :
              {color:"black"}
    }
    getTitle = (is_order_confirmed) => {
        return is_order_confirmed === "Confirmed" || is_order_confirmed === "confirmed"
          ? "confirmed"
          : is_order_confirmed === "Pending" || is_order_confirmed === "pending"
          ? "pending"
          : "not defined";
      };

    render() {
        return (
          <tr key={this.state.PendingOrder.customer_souls_id}>
            <td>
              <Link to={`/pendingorder/view-member/${this.props.PendingOrder.order_id}`}>
                <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
              </Link>
            </td>
            <td style={{ width: "20%" }}>{this.state.PendingOrder.customer_souls_id}</td>
            <td style={{ width: "20%" }}>{this.state.PendingOrder.customer_name}</td>
            <td style={{ width: "20%" }}>{this.state.PendingOrder.slot_time}</td>
            <td style={{ width: "10%" }}>{this.state.PendingOrder.slot_date}</td>
            <td style={{ width: "10%" }}>{this.state.PendingOrder.massage_duration}</td>
            <td style={{ width: "10%" }}>{this.state.PendingOrder.pincode}</td>
            <td style={{ width: "10%" }}>{this.state.PendingOrder.created_at}</td>
            <td className={this.getIcon(this.state.PendingOrder.is_order_confirmed)} 
            style={this.getColor(this.state.PendingOrder.is_order_confirmed)}
            data-toggle="tooltip"
            title={this.getTitle(this.state.PendingOrder.is_order_confirmed)}
            ></td>
            <td style={{ width: "10%" }}>{this.state.PendingOrder.merchant_transaction_id}</td>
            <td style={{ width: "20%" }}>{this.state.PendingOrder.total_order_amount}</td>
          </tr>
        );
      }
    }

    export default PendingOrderRow;