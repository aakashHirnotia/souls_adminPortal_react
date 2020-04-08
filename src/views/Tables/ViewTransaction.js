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
        <tr key={this.state.Transaction.Order_ID}>
          <th>{this.state.Transaction.Order_ID}</th>
          <th>{this.state.Transaction.customer_ID}</th>
          <td style={{ width: "20%" }}>{this.state.Transaction.souls_ID}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.customer_name}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.no_of_therapists_required}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.therapist_gender}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.massage_for}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.slot_time}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.slot_date}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.address}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.latitude}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.longitude}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.create_at}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.merchant_transaction_ID}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.transaction_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.bank_type}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_ID}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.total_order_amount}</td>

          <td>
            <Link to={`/transaction/view-member/${this.props.Transaction.Order_ID}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/transaction/edit-member/${this.props.Transaction.Order_ID}`}
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

        Order_ID: "",
        customer_ID:"",
        souls_ID:"",
        customer_name:"",
        no_of_therapists_required:"",
        therapist_gender:"",
        massage_for:"",
        slot_time:"",
        slot_date:"",
        massage_duration:"",
        address:"",
        pincode:"",
        latitude: "",
        longitude: "",
        create_at: "",
        merchant_transaction_ID: "",
        payment_gateway_mode:"",
        transaction_mode:"",
        bank_type:"",
        payment_gateway_ID:"",
        total_order_amount:"",
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit(e) {
      e.preventDefault();
      const searchTrans = {
        Order_ID: this.state.Order_ID,
        customer_ID: this.state.customer_ID,
        souls_ID: this.state.souls_ID,
        customer_name:this.state.customer_name,
        no_of_therapists_required: this.state.no_of_therapists_required,
        therapist_gender: this.state.therapist_gender,
        massage_for: this.state.massage_for,
        slot_time: this.state.slot_time,
        slot_date: this.state.slot_date,
        massage_duration: this.state.massage_duration,
        address: this.state.address,
        pincode: this.state.pincode,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        create_at: this.state.create_at,
        merchant_transaction_ID: this.state.merchant_transaction_ID,
        payment_gateway_mode: this.state.payment_gateway_mode,
        transaction_mode: this.state.transaction_mode,
        bank_type: this.state.bank_type,
        payment_gateway_ID: this.state.payment_gateway_ID,
        total_order_amount: this.state.total_order_amount,
    };
  
      searchTransaction(searchTrans);
    }
  
    async handlePageChange(pageNumber) {
      console.log(`pageNumber is ${pageNumber}`);
      this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataPageRecieved = await TransactionList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetTransactionData(dataPageRecieved);
      this.setState({ data: dataPageRecieved });
    }
  
    async componentDidMount() {
      const dataRecieved = await TransactionList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetTransactionData(dataRecieved);
      this.setState({ data: dataRecieved });
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
                        <th scope="col">Order ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Souls ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">No of Therapists Required</th>
                        <th scope="col">Therapists Gender</th>
                        <th scope="col">Massage For</th>
                        <th scope="col">Slot Time</th>
                        <th scope="col">Slot Date</th>
                        <th scope="col">Massage Duration</th>
                        <th scope="col">Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Merchant Transaction ID</th>
                        <th scope="col">Payment Gateway Mode</th>
                        <th scope="col">Transaction Mode</th>
                        <th scope="col">Bank Type</th>
                        <th scope="col">Payment Gateway ID</th>
                        <th scope="col">Total Order Amount</th>
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
                            name="Order_ID"
                            value={this.state.Order_ID}
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
                            name="customer_ID"
                            value={this.state.customer_ID}
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
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="o_of_therapists_required"
                            value={this.state.no_of_therapists_required}
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
                            name="therapist_gender"
                            value={this.state.therapist_gender}
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
                            name="massage_for"
                            value={this.state.massage_for}
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
                            name="address"
                            value={this.state.address}
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
                            name="latitude"
                            value={this.state.latitude}
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
                            name="longitude"
                            value={this.state.longitude}
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
                    itemsCountPerPage={this.itemsCountPerPage}
                    totalItemsCount={450} // check
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
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
  