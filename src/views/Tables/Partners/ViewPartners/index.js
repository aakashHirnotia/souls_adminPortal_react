import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { PartnerData, SetPartnerData } from "../../Datas";
import Pagination from "react-js-pagination";
import { partnerList, searchPartner } from "../../Functions";
import queryString from "query-string";
import PartnerRow from "./PartnerRow";

class ViewPartners extends Component {
  state = {
    query:{ 
      page:1,
      limit: 10,
      partner_id: "",
      partner_souls_id: "",
      partner_name: "",
      partner_email: "",
      partner_mobileno: "",
      partner_address: "",
      pincode: "",
      latitude: "",
      Longitude: "",
      Rate: "",
      Commission_Type: "",
      Onboard_Date: "",
      UpdatedAt: "",
      CreatedAt: "",
      created_by: "",
      updated_by: "",
      partner_gender: "",
    },
      data: [],
      count: 0,
      isFetching: true,
    };

  // async componentDidMount() {
  //   const dataRecieved = await partnerList(
  //     this.state.activePage,
  //     this.state.itemsCountPerPage
  //   );
  //   SetPartnerData(dataRecieved.data);
  //   const newData = dataRecieved.data
  //   this.setState({ data: newData,count: dataRecieved.count });
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
    const dataRecieved = await partnerList(query);
    console.log(dataRecieved.data)
    SetPartnerData(dataRecieved.data);
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
    window.location.href = "/tables/ViewPartners" + "?" + `${queryStr}`
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
    // this.handleQuery({ page: 1, limit: 10 });
    // const query = {
    //   page: 1,
    //   limit: 10,
    //   firstname: "",
    //   lastname: "",
    //   teamid: "",
    //   email: "",
    //   joining: "",
    //   status: "",
    //   role: "",
    //   mobileno: "",
    // };

    const query = this.state.query
    Object.keys(query).map(o=>query[o]="")
    this.setState({ query });
    this.props.history.push("/tables/ViewPartners");
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
                <i className="fa fa-align-justify"></i> Partner's{" "}
                <small className="text-muted">Table</small>
                <button
                  type="submit"
                  className="btn btn-outline-primary  btn-sm"
                  onClick={this.clearFilter}
                  style={{ position: "absolute", right: "120px" }}
                >
                  Clear Filter
                </button>
                <Link className="createBtn" to="/tables/add-partner">
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ position: "absolute", right: "20px" }}
                  >
                    Create Partner
                  </button>
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>
                      <th scope="col">Partner's ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">PIN Code</th>
                      <th scope="col">Per Visit Commission</th>
                      <th scope="col">Commission Type</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Gender</th>  
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="col">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                          onClick={this.onSubmit}
                        >
                          Search
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
                          name="partner_souls_id"
                          value={this.state.query.partner_souls_id}
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
                          name="partner_name"
                          value={this.state.query.partner_name}
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
                          name="partner_email"
                          value={this.state.query.partner_email}
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
                          name="partner_mobileno"
                          value={this.state.query.partner_mobileno}
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
                          name="Rate"
                          value={this.state.query.Rate}
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
                          name="Commission_Type"
                          value={this.state.query.Commission_Type}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="%">%</option>
                          <option value="Flat">Flat</option>
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
                          name="UpdatedAt"
                          value={this.state.query.UpdatedAt}
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
                          placeholder="select"
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="partner_gender"
                          value={this.state.query.partner_gender}
                          onChange={this.onChange}
                        >
                          <option value="" selected>{this.state.partner_gender!==""?"Clear":"Select"}</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((partner, index) => (
                            // {partnerList.map((partner, index) =>
                            <PartnerRow key={index} partner={partner} />
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

export default ViewPartners;