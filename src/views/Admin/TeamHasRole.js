import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { TeamHasRoleData, TeamHasRoleDatas, SetTeamHasRoleData } from "./TeamHasRoleData";
import Pagination from "react-js-pagination";
import UpdateRolePopUp from "./UpdateRolePopUp.js";
import { teamHasRoleList, searchTeamHasRole } from "./AdminFunctions";

class TeamHasRoleRow extends Component {
  state = {
    showModal: false,
    teamHasRole: this.props.teamHasRole
  };

  componentWillReceiveProps(nextProps) {
    this.setState({teamHasRole: this.props.teamHasRole})
  }

  getIcon = (status) => {
    return  (status === 'Active' || status === 'active') ? 'fa fa-check-square fa-lg' :
            (status === 'Inactive' || status === 'inactive') ? 'fa fa-window-close-o fa-lg' :
            (status === 'Deleted' || status === 'deleted') ? 'fa fa-trash' :
            'primary'
  }

  getColor = (status) => {
    return  (status === 'Active' || status === 'active')  ? {color:"green"} :
            (status === 'Inactive' || status === 'inactive') ? {color:"red"} :
            (status === 'Deleted' || status === 'deleted')  ? {color:"red"} :
            {color:"black"}
  }

  getTitle = (status) => {
    return  (status === 'Active' || status === 'active')  ? "active" :
            (status === 'Inactive' || status === 'inactive') ? "inactive" :
            (status === 'Deleted' || status === 'deleted')  ? "deleted" :
            "not defined"
  }

  getRole = (team_has_role_id) => {
    return  (team_has_role_id === 1 ) ? "Admin" :
            (team_has_role_id === 2 ) ? "Accountant" :
            (team_has_role_id === 3 ) ? "Customer Service" :
            "not defined"
  }

  displayModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <tr key={this.state.teamHasRole.team_has_role_id}>
        <th>{this.state.teamHasRole.teamid}</th>
        <td>{this.getRole(this.state.teamHasRole.team_has_role_id)}</td>
        <td>{this.state.teamHasRole.CreatedAt}</td>
        <td>{this.state.teamHasRole.UpdatedAt}</td>
        <td className={this.getIcon(this.state.teamHasRole.status)} style={this.getColor(this.state.teamHasRole.status)} data-toggle="tooltip" title={this.getTitle(this.state.teamHasRole.status)}></td>
        <td>
          <Link style={{ paddingLeft: "14px" }} onClick={this.displayModal}>
            <i className="fa fa-pencil" data-toggle="tooltip" title="Update Role"></i>
          </Link>
        </td>
        <UpdateRolePopUp
          teamid={this.state.teamHasRole.teamid}
          show={this.state.showModal}
          handleClose={this.closeModal}
        />
      </tr>
    );
  }
}

class TeamHasRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,

      data: [],
      count: 0,
      teamid: "",
      team_has_role_id: "",
      status: "",
      CreatedAt: "",
      UpdatedAt: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }



  async componentDidMount() {
    const dataRecieved = await teamHasRoleList(
      this.state.activePage,
      this.state.itemsCountPerPage
    );
    SetTeamHasRoleData(dataRecieved.data);
    const newData = dataRecieved.data
    this.setState({ data: newData, count: dataRecieved.count });
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit= async (e)=> {
    e.preventDefault();
    const searchUser = {
      status: this.state.status
    };

    const dataRecieved = await searchTeamHasRole(searchUser);
    SetTeamHasRoleData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData });
  }

  handlePageChange = async (pageNumber) => {
    console.log(`pageNumber is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    console.log(`active page is ${this.state.activePage}`);

    const dataRecieved = await teamHasRoleList(
      pageNumber,
      this.state.itemsCountPerPage
    );
    SetTeamHasRoleData(dataRecieved.data);
    // console.log(dataPageRecieved)
    const newData = dataRecieved.data
    // console.log("newdata = " + newData.length)
    this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
  }
  render() {
    // console.log('DAta: ')
    // console.log(this.state.data.forEach(o=>console.log(o)))
    // const teamList = (TeamHasRoleData.length !== 0 ? TeamHasRoleData : TeamHasRoleDatas).filter(
    //   team => team.id < 10
    // );
    // console.log(this.state.data.forEach(o => console.log(o)));

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} style={{ padding: "0" }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Team Has Role{" "}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th style={{width: "10%"}} scope="col">Team ID</th>
                      <th style={{width: "10%"}} scope="col">Role</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <form onSubmit={this.onSubmit}> */}
                      <td scope="col">
                        <input
                          type="search"
                          class="form-control mr-sm-2"
                          id=""
                          placeholder=""
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="teamid"
                          value={this.state.teamid}
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
                          value={this.state.team_has_role_id}
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
                          name="UpdatedAt"
                          value={this.state.UpdatedAt}
                          onChange={this.onChange}
                        />
                      </td>
                      <td scope="col">
                        {/* <input type="search" class="form-control mr-sm-2" id="" placeholder="" aria-label="Search for..." style={{height:"30px"}} name="status" value={this.state.status} onChange={this.onChange} /> */}
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
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Deleted">Deleted</option>
                        </select>
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
                          this.state.data.map((teamHasRole, index) => (
                            // {teamList.map((team, index) =>
                            <TeamHasRoleRow key={index} teamHasRole={teamHasRole} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((teamHasRole, index) => (
                          <TeamHasRoleRow key={index} teamHasRole={teamHasRole} />
                        ))}
                      </React.Fragment>
                    )}
                  </tbody>
                </Table>
                <Pagination
                  className="pagination"
                  hideDisabled
                  activePage={this.state.activePage}
                  itemsCountPerPage={5}
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

export default TeamHasRole;
