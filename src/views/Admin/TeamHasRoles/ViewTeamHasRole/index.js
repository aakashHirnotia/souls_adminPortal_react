import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { TeamHasRoleData, TeamHasRoleDatas, SetTeamHasRoleData } from "../Data";
import Pagination from "react-js-pagination";
import UpdateRolePopUp from "../UpdateRolePopUp.js";
import { teamHasRoleList, searchTeamHasRole } from "../../AdminFunctions";
import TeamHasRoleRow from './TeamHasRoleRow'
import queryString from "query-string";

class TeamHasRole extends Component {
  state = {
      query:{
        page:1,
        limit:10,

        teamid: 0,
        first_name: "",
        last_name: "",
        team_has_role_id: "",
        status: "",
        CreatedAt: "",
        UpdatedAt: ""
      },

      data: [],
      count: 0,
      isFetching: true,
      errors: {}
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
    const dataRecieved = await teamHasRoleList(query);
    console.log(dataRecieved.data)
    SetTeamHasRoleData(dataRecieved.data);
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
    window.location.href = "/team-has-role" +"?" + btoa(`${queryStr}`)
    console.log(btoa("/team-has-role" + "?" + `${queryStr}`))
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
    this.props.history.push("/team-has-role");
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
                <i className="fa fa-align-justify"></i> Team Has Role{" "}
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
                      <th style={{width: "10%"}} scope="col">Team ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th style={{width: "10%"}} scope="col">Role</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <form onSubmit={this.onSubmit}> */}
                      <td scope="col">
                        <button
                          type="submit"
                          className="btn btn-sm btn-outline-primary"
                          style={{ justifyContent: "center" }}
                          onClick={this.onSubmit}
                        >
                          SEARCH
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
                          name="first_name"
                          value={this.state.query.first_name}
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
                          name="last_name"
                          value={this.state.query.last_name}
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
                          name="team_has_role_id"
                          value={this.state.query.team_has_role_id}
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
                        {/* <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}} name="status" value={this.state.query.status} onChange={this.onChange} /> */}
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
                          {/* <option value="">Select</option> */}
                          <option disabled={true} value="" selected>{this.state.query.status !== ""? "": "Select"}</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Deleted">Deleted</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((teamHasRole, index) => (
                            // {teamList.map((team, index) =>
                            <TeamHasRoleRow key={index} teamHasRole={teamHasRole} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <div>
                        {this.state.isFetching ? (
                          <div >Loading...</div>
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

export default TeamHasRole;
