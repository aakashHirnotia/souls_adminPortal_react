import React from "react";
import { teamList } from "../UserFunctions";
import { Link } from "react-router-dom";
import TeamRow from "./ViewTeamRow";
import Pagination from "react-js-pagination";
import { SetTeamData } from "../TeamData";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import queryString from "query-string";

class ViewTeam extends React.Component {
  state = {
    query: {
      page: 1,
      limit: 10,
      firstname: "",
      lastname: "",
      teamid: "",
      email: "",
      joining: "",
      status: "",
      role: "",
      mobileno: "",
    },
    data: [],
    count: 0,
    isFetching: true,
  };

  async componentDidMount() {
    let url = this.props.location.search;
    let query = queryString.parse(url);
    console.log(query);
    await this.handleQuery(query);
  }

  async componentWillReceiveProps(nP) {
    let url = nP.location.search;
    let query = queryString.parse(url);
    console.log(query);
    await this.handleQuery(query);
  }

  handleQuery = async (query) => {
    query["page"] = query["page"] !== "" ? Number(query["page"]) : 1;
    query["limit"] = 10;
    const dataRecieved = await teamList(query);
    SetTeamData(dataRecieved.data);
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
    this.props.history.push("/team/list" + "?" + `${queryStr}`);
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
    if (window.location.pathname.includes("?"))
      this.props.history.push(window.location.pathname + `page=${page}`);
    else
      this.props.history.push(window.location.pathname + "?" + `page=${page}`);
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
    this.props.history.push("/team/list");
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
                <i className="fa fa-align-justify"></i> Team{" "}
                <small className="text-muted">Members</small>
                <button
                  type="submit"
                  className="btn btn-outline-primary  btn-sm"
                  onClick={this.clearFilter}
                  style={{ position: "absolute", right: "120px" }}
                >
                  Clear Filter
                </button>
                <Link className="createTeamBtn" to="/team/add-member">
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ position: "absolute", right: "20px" }}
                  >
                    Create Team
                  </button>
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>
                      <th style={{ width: "5%" }} scope="col">
                        ID
                      </th>
                      <th style={{ width: "8%" }} scope="col">
                        First Name
                      </th>
                      <th style={{ width: "8%" }} scope="col">
                        Last Name
                      </th>
                      <th style={{ width: "18%" }} scope="col">
                        Email
                      </th>
                      <th style={{ width: "15%" }} scope="col">
                        Mobile
                      </tfirstnameh>
                      <th style={{ width: "25%" }} scope="col">
                        Joining Date
                      </th>
                      <th style={{ width: "5%" }} scope="col">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <form onSubmit={this.onSubmit}> */}
                      <td scope="col">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                          onClick={this.onSubmit}
                        >
                          Search
                        </button>
                        {/* <button
                          type="submit"
                          className="btn btn-sm btn-outline-primary"
                          style={{ justifyContent: "center" }}
                          onClick={this.onSubmit}
                        >
                          search!
                        </button> */}
                      </td>

                      <td scope="col">
                        <input
                          type="search"
                          class="form-control mr-sm-2"
                          id=""
                          placeholder=""
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="teamid"
                          value={this.state.query.teamid}
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
                          name="firstname"
                          value={this.state.query.  }
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
                          name="lastname"
                          value={this.state.query.lastname}
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
                          name="email"
                          value={this.state.query.email}
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
                          name="mobileno"
                          value={this.state.query.mobileno}
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
                          name="joining"
                          value={this.state.query.joining}
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
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Deleted">Deleted</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data.length !== 0 ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((team, index) => (
                            // {teamList.map((team, index) =>
                            <TeamRow key={index} team={team} />
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

export default ViewTeam;
