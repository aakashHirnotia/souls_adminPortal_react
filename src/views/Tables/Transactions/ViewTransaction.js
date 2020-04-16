import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { TransactionData, SetTransactionData } from "../Datas";
import Pagination from "react-js-pagination";
import { TransactionList, searchTransaction } from "../Functions";

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
          <td style={{ width: "20%" }}>{this.state.Transaction.Slot_Time}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.Slot_Date}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.Transaction.CreatedAt}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.transaction_mode}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.bank_type}</td>
          <td style={{ width: "20%" }}>{this.state.Transaction.payment_gateway_id}</td>
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
        customer_souls_id:"",
        customer_name:"",
        merchant_transaction_id: "",
        total_order_amount:"",
        Slot_Time:"",
        Slot_Date:"",
        massage_duration:"",
        pincode:"",
        CreatedAt: "",
        payment_gateway_mode:"",
        transaction_mode:"",
        bank_type:"",
        payment_gateway_id:"",
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
        customer_souls_id: this.state.customer_souls_id,
        customer_name:this.state.customer_name,
        Slot_Time: this.state.Slot_Time,
        Slot_Date: this.state.Slot_Date,
        massage_duration: this.state.massage_duration,
        pincode: this.state.pincode,
        CreatedAt: this.state.CreatedAt,
        merchant_transaction_id: this.state.merchant_transaction_id,
        payment_gateway_mode: this.state.payment_gateway_mode,
        transaction_mode: this.state.transaction_mode,
        bank_type: this.state.bank_type,
        payment_gateway_id: this.state.payment_gateway_id,
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
                        <th scope="col">Actions</th>
                        <th scope="col">SOULS ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Merchant TXN ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Slot Time</th>
                        <th scope="col">Slot Date</th>
                        <th scope="col">Massage Duration</th>
                        <th scope="col">PIN Code</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Payment Gateway Mode</th>
                        <th scope="col">Transaction Mode</th>
                        <th scope="col">Bank Type</th>
                        <th scope="col">Payment Gateway ID</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="customer_souls_id"
                            value={this.state.customer_souls_id}
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
                            name="merchant_transaction_id"
                            value={this.state.merchant_transaction_id}
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
                            name="Slot_Time"
                            value={this.state.Slot_Time}
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
                            name="Slot_Date"
                            value={this.state.Slot_Date}
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
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="CreatedAt"
                            value={this.state.CreatedAt}
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
                            name="payment_gateway_mode"
                            value={this.state.payment_gateway_mode}
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
                            name="transaction_mode"
                            value={this.state.transaction_mode}
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
                            name="bank_type"
                            value={this.state.bank_type}
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
                            name="payment_gateway_id"
                            value={this.state.payment_gateway_id}
                            onChange={this.onChange}
                          />
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
  