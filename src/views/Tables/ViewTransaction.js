import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { TransactionData, SetTransactionData } from "./Datas";
import Pagination from "react-js-pagination";
import { TransactionList, searchTransaction } from "./Functions";

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
          <td style={{ width: "20%" }}>{this.state.Transaction.customer_souls_id}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.customer_name}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.merchant_transaction_id}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.total_order_amount}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.Slot_Time}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.Slot_Date}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.CreatedAt}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.transaction_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.bank_type}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_id}</td>


          <td>
            <Link to={`/transaction/view-member/${this.props.Transaction.order_id}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/transaction/edit-member/${this.props.Transaction.order_id}`}
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </td>
        </tr>
      );
    }
  }
  
  class ViewTransaction extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 1,
        itemsCountPerPage: 10,
  
        data: [],
        count: 0,
        souls_ID:"",
        customer_name:"",
        merchant_transaction_ID: "",
        total_order_amount:"",
        slot_time:"",
        slot_date:"",
        massage_duration:"",
        pincode:"",
        create_at: "",
        payment_gateway_mode:"",
        transaction_mode:"",
        bank_type:"",
        payment_gateway_ID:"",

        errors: {}
      };
      this.onChange = this.onChange.bind(this);
      // this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidMount() {
      const dataRecieved = await TransactionList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetTransactionData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData ,count: dataRecieved.count});
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }


    onSubmit = async(e)=> {
      e.preventDefault();
      const searchTrans = {
        souls_ID: this.state.souls_ID,
        customer_name:this.state.customer_name,
        slot_time: this.state.slot_time,
        slot_date: this.state.slot_date,
        massage_duration: this.state.massage_duration,
        pincode: this.state.pincode,
        create_at: this.state.create_at,
        merchant_transaction_ID: this.state.merchant_transaction_ID,
        payment_gateway_mode: this.state.payment_gateway_mode,
        transaction_mode: this.state.transaction_mode,
        bank_type: this.state.bank_type,
        payment_gateway_ID: this.state.payment_gateway_ID,
        total_order_amount: this.state.total_order_amount,
    };
  
      const dataRecieved = await searchTransaction(searchTrans);
      SetTransactionData(dataRecieved);
      const newData = dataRecieved
      this.setState({ data: newData })
    }
  
    handlePageChange = async (pageNumber)=> {
      console.log(`pageNumber is ${pageNumber}`);
      // this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataRecieved = await TransactionList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetTransactionData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
    }
  
    render() {
      // console.log('DAta: ')
      // console.log(this.state.data.forEach(o=>console.log(o)))
      const TransactionList = TransactionData.filter(
        Transaction => Transaction.Order_ID < 10
      );
      console.log(this.state.data.forEach(o => console.log(o)));
  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12} style={{ padding: "0" }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Transaction{" "}
                  <small className="text-muted">Members</small>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">SOULS ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Merchant TXN ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Slot Time</th>
                        <th scope="col">Slot Date</th>
                        <th scope="col">Massage Duration</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Payment Gateway Mode</th>
                        <th scope="col">Transaction Mode</th>
                        <th scope="col">Bank Type</th>
                        <th scope="col">Payment Gateway ID</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="souls_ID"
                            value={this.state.souls_ID}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="Customer_name"
                            value={this.state.customer_name}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="merchant_transaction_ID"
                            value={this.state.merchant_transaction_ID}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="total_order_amount"
                            value={this.state.total_order_amount}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="slot_time"
                            value={this.state.slot_time}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="slot_date"
                            value={this.state.slot_date}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="massage_duration"
                            value={this.state.massage_duration}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="pincode"
                            value={this.state.pincode}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="create_at"
                            value={this.state.create_at}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="payment_gateway_mode"
                            value={this.state.payment_gateway_mode}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="transaction_mode"
                            value={this.state.transaction_mode}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="bank_type"
                            value={this.state.bank_type}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="payment_gateway_ID"
                            value={this.state.payment_gateway_ID}
                            onChange={this.onChange}
                          />
                        </td>
                        <td scope="col">
                          <button
                            type="submit"
                            className="btn btn-sm btn-outline-primary"
                            style={{ justifyContent: "center" }}
                            onClick={this.onSubmit}
                          >
                            search!
                          </button>
                        </td>
                      </tr>
  
                      {this.state.data ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((Transaction, index) => (
                              // {TransactionList.map((Transaction, index) =>
                              <TransactionRow key={index} Transaction={Transaction} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {TransactionList.map((Transaction, index) => (
                            <TransactionRow key={index} Transaction={Transaction} />
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </Table>
                  <Pagination
                    className="pagination"
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.count} // check
                    pageRangeDisplayed={10}
                    onChange={this.handlePageChange}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
  
  export default ViewTransaction;
  