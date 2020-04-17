// import React, { Component } from 'react';

// class ViewCommunicationTempelate extends Component {
//     //state = {  }
//     render() { 
//         return ( <div> Communication Tempelate</div> );
//     }
// }
 
// export default ViewCommunicationTempelate;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { CommTempelateData, SetCommTempelateData } from "../Data";
import Pagination from "react-js-pagination";
import { communicationTempelateList, searchCommunicationTempelate } from "../../AdminFunctions";
import ViewCommunicationTempelateRow from './ViewCommunicationTempelateRow'
import queryString from "query-string";

class ViewCommunicationTempelate extends Component {
  state = {
    query:{
      page: 1,
      limit: 10,
      templ_id: "",
      templ_type: "",
      trigger_time: "",
      trigger_for: "",
      sms_content: "",
      subject: "",
      email_content: "",
      status: ""
    },
      data: [],
      count: 0,
      isFetching: true,
      errors: {}
    };

  async componentDidMount() {
    let url = this.props.location.search;
    let query = queryString.parse(url);
    console.log(query);
    await this.handleQuery(query);
    // const dataRecieved = await communicationTempelateList(
    //   this.state.activePage,
    //   this.state.itemsCountPerPage
    // );
    // SetCommTempelateData(dataRecieved.data);
    // const newData = dataRecieved.data
    // this.setState({ data: newData, count: dataRecieved.count});
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
    const dataRecieved = await communicationTempelateList(query);
    SetCommTempelateData(dataRecieved.data);
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
    window.location.href = "/admin/CommunicationTempelate" + "?" + `${queryStr}`
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

  // handlePageChange = async (pageNumber) => {
  //   console.log(`pageNumber is ${pageNumber}`);
  //   // this.setState({ activePage: pageNumber });
  //   console.log(`active page is ${this.state.activePage}`);

  //   const dataRecieved = await communicationTempelateList(
  //     pageNumber,
  //     this.state.itemsCountPerPage
  //   );
  //   SetCommTempelateData(dataRecieved.data);
  //   // console.log(dataPageRecieved)
  //   const newData = dataRecieved.data
  //   this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
  // }

  clearFilter = () => {
    const query = this.state.query
    Object.keys(query).map(o=>query[o]="")
    this.setState({ query });
    this.props.history.push("/admin/CommunicationTempelate");
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
                <i className="fa fa-align-justify"></i> Communication Tempelate{" "}
                <button
                  type="submit"
                  className="btn btn-outline-primary  btn-sm"
                  onClick={this.clearFilter}
                  style={{ position: "absolute", right: "135px" }}
                >
                  Clear Filter
                </button>
                <Link className="createTeamBtn" to="/admin/add-communication-tempelate">
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ position: "absolute", right: "20px" }}
                  >
                    Create Template
                  </button>
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>
                      <th scope="col">ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Trigger Time</th>
                      <th scope="col">Trigger For</th>
                      <th scope="col">SMS Content</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Email Content</th>
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
                          name="templ_id"
                          value={this.state.query.templ_id}
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
                          name="templ_type"
                          value={this.state.query.templ_type}
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
                          name="trigger_time"
                          value={this.state.query.trigger_time}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="10">10 min.</option>
                          <option value="30">30 min.</option>
                          <option value="60">1 hour</option>
                        </select>
                      </td>
                      <td scope="col">
                        <select
                          type="search"
                          class="form-control mr-sm-2"
                          id=""
                          placeholder=""
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="trigger_for"
                          value={this.state.query.trigger_for}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="customer">Customer</option>
                          <option value="partner">Partner</option>
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
                          name="sms_content"
                          value={this.state.query.sms_content}
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
                          name="subject"
                          value={this.state.query.subject}
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
                          name="email_content"
                          value={this.state.query.email_content}
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
                          <option value="" selected>
                            {this.state.query.status !== ""
                              ? "Clear"
                              : "Select"}
                          </option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((communicationTempelate, index) => (
                            // {teamList.map((communicationTempelate, index) =>
                            <ViewCommunicationTempelateRow key={index} communicationTempelate={communicationTempelate} />
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

export default ViewCommunicationTempelate;
