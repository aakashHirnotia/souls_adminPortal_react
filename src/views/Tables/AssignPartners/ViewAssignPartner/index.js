import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { AssignPartnerData, SetAssignPartnerData } from "../../Datas";
import Pagination from "react-js-pagination";
import { AssignPartnerList, searchAssignPart } from "../../Functions";
import queryString from "query-string";
import AssignPartnerRow from "./AssignPartnerRow";

class AssignPartners extends React.Component {
    state = {
      query: {
        page: 1,
        limit: 10,
        customer_souls_id:"",
        customer_name: "",
        customer_mobile_no: "",
        slot_time:"",
        slot_date:"",
        partner_souls_id:"",
        partner_name:"",
        partner_mobileno:"",
        created_at: "",
        status: "",
      },
      data: [],
      count: 0,
      isFetching: true,
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
      const dataRecieved = await AssignPartnerList(query);
      console.log(dataRecieved.data)
      SetAssignPartnerData(dataRecieved.data);
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
      window.location.href = "/tables/assignPartners" +"?" + btoa(`${queryStr}`)
      console.log(btoa("/tables/assignPartners" + "?" + `${queryStr}`))
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
        this.props.history.push("/tables/assignPartners");
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
                    <i className="fa fa-align-justify"></i>Assign Partner Table{" "}
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
                          <th scope="col">Customer SOULS ID</th>
                          <th style= {{width: "10%"}} scope="col">Customer Name</th>
                          <th scope="col">Customer Mobile No</th>
                          <th scope="col">Slot Time</th>
                          <th scope="col">Slot Date</th>
                          <th scope="col">Partner SOULS ID</th>
                          <th scope="col">Partner Name</th>
                          <th scope="col">Partner Mobile No</th>
                          <th scope="col">Created Time</th>
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
                              name="customer_mobile_no"
                              value={this.state.customer_mobile_no}
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
                              name="partner_souls_id"
                              value={this.state.partner_souls_id}
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
                              value={this.state.partner_name}
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
                              value={this.state.partner_mobileno}
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
                            <select
                              type="search"
                              class="form-control mr-sm-2"
                              id=""
                              placeholder=""
                              aria-label="Search for..."
                              style={{ height: "30px" }}
                              name="status"
                              value={this.state.status}
                              onChange={this.onChange}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepeted">Accepted</option>
                              <option value="Attended">Attended</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
    
                        {this.state.data.length !==0 ? (
                          <React.Fragment>
                            {this.state.data &&
                              this.state.data.map((assignPartner, index) => (
                                <AssignPartnerRow key={index} assignPartner={assignPartner} />
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
    
    export default AssignPartners;