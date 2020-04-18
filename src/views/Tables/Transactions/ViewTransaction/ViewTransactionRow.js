import React, { Component } from "react";
import { Link } from "react-router-dom";

class TransactionRow extends Component {
    state = {
      showModal: false,
      Transaction: this.props.Transaction
    };
  
    displayModal = () => {
      this.setState({ showModal: true });
    };
    closeModal = () => {
      this.setState({ showModal: false });
    };
    render() {
      return (
        <tr key={this.state.Transaction.customer_souls_id}>
          <td>
            <Link to={`/transaction/view-member/${this.props.Transaction.order_id}`}>
              <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/transaction/edit-member/${this.props.Transaction.order_id}`}
            >
              <i className="fa fa-pencil" data-toggle="tooltip" title="update"></i>
            </Link>
          </td>
          <td style={{ width: "20%" }}>{this.state.Transaction.customer_souls_id}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.customer_name}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.merchant_transaction_id}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.total_order_amount}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.slot_time}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.slot_date}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.created_at}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.transaction_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.bank_type}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_id}</td>
        </tr>
      );
    }
  }

  export default TransactionRow;