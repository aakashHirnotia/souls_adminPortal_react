import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { customerData, SetCustomerData } from "../../Datas";
import Pagination from "react-js-pagination";
import CustomerRow from "./CustomerRow";
import { customerList, searchCust } from "./../../Functions";
import queryString from "query-string";

  
  class ViewCustomer extends Component {
    state = {
      query: { 
        page:1,
        limit: 10,
        id: "",
        customer_souls_id:"",
        customer_name: "",
        customer_mobile_no: "",
        customer_gender: "",
        customer_email: "",
        customer_address: "",
        pincode: "",
        CreatedAt: "",
        registrated_source: "",
        Last_Access_Time: "",
        status: ""
      },
        data: [],
        count: 0,
        isFetching: true,
        errors:{}
        
    };
    
    // async componentDidMount() {
    //   const dataRecieved = await customerList(
    //     this.state.activePage,
    //     this.state.itemsCountPerPage
    //   );
    //   SetCustomerData(dataRecieved.data);
    //   const newData = dataRecieved.data
    //   this.setState({ data: newData, count: dataRecieved.count });
    // }
    async componentDidMount() {
      let url = this.props.location.search;
      let query = queryString.parse(url);
      console.log(query);
      await this.handleQuery(query);
    }

    async UNSAFE_componentWillReceiveProps(nP) {
      let url = nP.location.search;
      let query = queryString.parse(url);
      console.log("PARSED")
      console.log(query);
      await this.handleQuery(query);
    }

    handleQuery = async (query) => {
      query["page"] = query["page"] !== "" ? Number(query["page"]) : 1;
      query["limit"] = 10;
      const dataRecieved = await customerList(query);
      console.log(dataRecieved.data)
      SetCustomerData(dataRecieved.data);
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
  
    // onSubmit= async (e) =>{
    //   e.preventDefault();
    //   const searchCustomer = {
    //     customer_souls_id: this.state.customer_souls_id,
    //     customer_name: this.state.customer_name,
    //     customer_mobile_no: this.state.customer_mobile_no,
    //     customer_gender: this.state.customer_gender,
    //     customer_email: this.state.customer_email,
    //     pincode: this.state.pincode,
    //     CreatedAt: this.state.CreatedAt,
    //     status: this.state.status
    //   };
  
    //   const dataRecieved = await searchCust(searchCustomer);
    //   SetCustomerData(dataRecieved);
    //   const newData = dataRecieved
    //   this.setState({ data: newData });
    // }

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
      window.location.href = "/customers" + "?" + `${queryStr}`
    };
  
    handlePageChange = (page) => {
      // let queryStr = "";
      // Object.keys(this.state.query).forEach((o) => {
      //   if(o=='page')queryStr += `${o}=${page}&`;
      //   if (this.state.query[o] != "") queryStr += `${o}=${this.state.query[o]}&`;
      // });
      // queryStr = queryStr.replace(queryStr.length - 1, "");
      // console.log(queryStr);
      // window.location.href = "/team/list" + "?" + `${queryStr}`;
      if (window.location.pathname.includes("?")) {
        // this.props.history.push(window.location.pathname + `page=${page}`);
        window.location.href =window.location.pathname + `page=${page}`
      }
      else {
        window.location.href = window.location.pathname + "?" + `page=${page}`
        // this.props.history.push(window.location.pathname + "?" + `page=${page}`);
      }
    };
  
    clearFilter = () => {
  
      const query = this.state.query
      Object.keys(query).map(o=>query[o]="")
      this.setState({ query });
      this.props.history.push("/customers");
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
                  <i className="fa fa-align-justify"></i> Customer Table{" "}
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
                        <th style= {{width: "10%"}} scope="col">Name</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">PIN Code</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Status</th>
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
                            value={this.state.query.customer_souls_id}
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
                            value={this.state.query.customer_name}
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
                            name="customer_mobile_no"
                            value={this.state.query.customer_mobile_no}
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
                            name="customer_gender"
                            value={this.state.query.customer_gender}
                            onChange={this.onChange}
                          > 
                            <option value="" selected>{this.state.customer_gender!==""?"Clear":"Select"}</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other" >Other</option>
                          </select>
                        </td>
                        <td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="customer_email"
                            value={this.state.query.customer_email}
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
                            value={this.state.query.pincode}
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
                            value={this.state.query.CreatedAt}
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
                            name="status"
                            value={this.state.query.status}
                            onChange={this.onChange}
                          >
                            <option value="" selected>{this.state.status!==""?"Clear":"Select"}</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                      </tr>
  
                      {this.state.data.length !==0 ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((customer, index) => (
                              // {customerList.map((customer, index) =>
                              <CustomerRow key={index} customer={customer} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <div>
                          {this.state.isFetching ? (
                            <div>Loading...</div>
                          ) : (
                            <div
                              style={{
                                margin: "auto",
                                color: "red",
                                width: "100%",
                              }}
                            >
                              NO RECORDS FOUND
                            </div>
                          )}
                        </div>
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
  
  export default ViewCustomer;
