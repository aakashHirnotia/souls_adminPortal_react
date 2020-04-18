import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import {  SetTransactionData } from "../../Datas";
import Pagination from "react-js-pagination";
import { TransactionList} from "../../Functions";
import queryString from "query-string";
import TransactionRow from "./ViewTransactionRow"

class ViewTransaction extends Component {
    state = {
        query: { 
          page:1,
          limit: 10,
    
          customer_souls_id:"",
          customer_name:"",
          merchant_transaction_id: "",
          total_order_amount:"",
          slot_time:"",
          slot_date:"",
          massage_duration:"",
          pincode:"",
          created_at: "",
          payment_gateway_mode:"",
          transaction_mode:"",
          bank_type:"",
          payment_gateway_id:"",
      },
      data: [],
      count: 0,
      isFetching: true,
      errors:{}
    };

    async componentDidMount() {
      let url = this.props.location.search;
      url = url.slice(1)
      console.log(url)
  
      url = window.atob(url)
      console.log(url)
      let query = queryString.parse(url);
      console.log(query);
      await this.handleQuery(query);
    }

    async UNSAFE_componentWillReceiveProps(nP) {
      let url = nP.location.search;
      url = url.slice(1)
      console.log(url)
  
      url = window.atob(url)
      console.log(url)
      let query = queryString.parse(url);
      console.log("PARSED")
      console.log(query);
      await this.handleQuery(query);
    }

    handleQuery = async (query) => {
      query["page"] = query["page"] !== "" ? Number(query["page"]) : 1;
      query["limit"] = 10;
      const dataRecieved = await TransactionList(query);
      console.log(dataRecieved.data)
      SetTransactionData(dataRecieved.data);
      const newData = dataRecieved.data;
      this.setState({
        data: newData,
        count: dataRecieved.count,
        query,
        isFetching: false,
      });
    };
    onChange = (e) => {
      const query = this.state.query;
      query[e.target.name] = e.target.value;
      this.setState({ query });
    };
  

    onSubmit = (e) => {
      e.preventDefault();
      const query = this.state.query;
      query["page"] = 1;
      query["limit"] = 10;
      let queryStr = "";
      Object.keys(query).forEach((o) => {
        if (query[o] != "" || query[o] != null) queryStr += `${o}=${query[o]}&`;
      });
      queryStr = queryStr.replace(queryStr.length - 1, "");
      // this.props.history.push("/team/list" + "?" + `${queryStr}`);
      window.location.href = "/transactions" +"?" + btoa(`${queryStr}`)
      console.log(btoa("/transactions" + "?" + `${queryStr}`))
    };
  

    handlePageChange = (page) => {
      if (window.location.pathname.includes("?")) {
        // this.props.history.push(window.location.pathname + `page=${page}`);
        window.location.href =window.location.pathname + btoa(`page=${page}`)
        console.log(btoa(window.location.pathname + `page=${page}`))
      }
      else {
        console.log(btoa(window.location.pathname + `page=${page}`))
        window.location.href = window.location.pathname + "?" + btoa(`page=${page}`)
      }
    };  
      clearFilter = () => {
    
        const query = this.state.query
        Object.keys(query).map(o=>query[o]="")
        this.setState({ query });
        this.props.history.push("/transactions");
      };

      render() {
        console.log("QUERY");
        console.log(this.state.query);
        console.log("DATA");
        console.log(this.state.data);
        return (
          <div className="animated fadeIn">
            <Row>
              <Col xl={12} style={{ padding: "0" }}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Transaction{" "}
                    <button
                    type="submit"
                    className="btn btn-outline-primary  btn-sm"
                    onClick={this.clearFilter}
                    style={{ position: "absolute", right: "20px" }}
                    >
                        Clear Filter
                    </button>
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
                              name="customer_name"
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
                            <input
                              type="search"
                              class="form-control mr-sm-2"
                              id=""
                              placeholder=""
                              aria-label="Search for..."
                              style={{ height: "30px" }}
                              name="created_at"
                              value={this.state.created_at}
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
    
                        {this.state.data.length !== 0 ? (
                          <React.Fragment>
                            {this.state.data &&
                              this.state.data.map((Transaction, index) => (
                                <React.Fragment>
                                  <TransactionRow key={index} Transaction={Transaction} />
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        ) : (
                          <tr>
                          {this.state.isFetching ? (
                            <div>Loading...</div>
                          ) : (
                            <React.Fragment
                              style={{
                                margin: "auto",
                                color: "red",
                                width: "100%",
                                textAlign:"center"
                              }} >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="not-found">NO</td>
                              <td className="not-found">RECORDS</td>
                              <td className="not-found">FOUND</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </React.Fragment>
                          )}
                        </tr>
                        )}
                      </tbody>
                    </Table>
                    <Pagination
                      className="pagination"
                      hideDisabled
                      activePage={this.state.query.page}
                      itemsCountPerPage={this.state.query.limit}
                      totalItemsCount={this.state.count}
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
