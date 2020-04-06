import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import PasswordPopUp from "./PasswordPopUp.js";
import { TeamData, TeamDatas, SetTeamData } from "./TeamData";
import Pagination from "react-js-pagination";
import { teamList, search } from "./UserFunctions";

class TeamRow extends Component {
  state = {
    showModal: false,
    team: this.props.team
  };

  componentWillReceiveProps(nextProps) {
    this.setState({team: this.props.team})
  }

  getIcon = (status) => {
    return  (status === 'Active' || status === 'active') ? 'fa fa-check' :
            (status === 'Inactive' || status === 'inactive') ? 'fa fa-close' :
            (status === 'Deleted' || status === 'deleted') ? 'fa fa-trash' :
            'primary'
  }

  getColor = (status) => {
    return  (status === 'Active' || status === 'active')  ? {color:"green"} :
            (status === 'Inactive' || status === 'inactive') ? {color:"blue"} :
            (status === 'Deleted' || status === 'deleted')  ? {color:"red"} :
            {color:"black"}
  }

  displayModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <tr key={this.state.team.teamid}>
        <th>{this.state.team.teamid}</th>
        <td style={{ width: "10%" }}>{this.state.team.firstname}</td>
        <td style={{ width: "10%" }}>{this.state.team.lastname}</td>
        <td>{this.state.team.email}</td>
        <td>{this.state.team.mobileno}</td>
        {/* <td>{this.state.team.registered}</td> */}
        <td style={{ width: "12%" }}>{this.state.team.Joining_Date}</td>
        <td className={this.getIcon(this.state.team.status)} style={this.getColor(this.state.team.status)}></td>
        <td>
          <Link to={`/team/view-member/${this.props.team.teamid}`}>
            <i className="fa fa-eye"></i>
          </Link>
          <Link style={{ padding: "10px" }} onClick={this.displayModal}>
            <i className="fa fa-key"></i>
          </Link>{" "}
          <br />
          <Link
            style={{ paddingLeft: "14px" }}
            to={`/team/edit-member/${this.props.team.teamid}`}
          >
            <i className="fa fa-pencil"></i>
          </Link>
        </td>
        <PasswordPopUp
          email={this.state.team.email}
          show={this.state.showModal}
          handleClose={this.closeModal}
        />
      </tr>
    );
  }
}

class ViewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,

      data: [],

      id: "",
      first_name: "",
      last_name: "",
      // gender : '',
      email: "",
      // password : '',
      joining: "",
      status: "",
      mobile: "",
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
    const searchUser = {
      id: this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      joining: this.state.joining,
      status: this.state.status,
      mobile: this.state.mobile
    };

    search(searchUser);
  }

  async handlePageChange(pageNumber) {
    console.log(`pageNumber is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    console.log(`active page is ${this.state.activePage}`);

    const dataPageRecieved = await teamList(
      pageNumber,
      this.state.itemsCountPerPage
    );
    SetTeamData(dataPageRecieved);
    console.log(dataPageRecieved)
    this.setState({ data: dataPageRecieved });
  }

  async componentDidMount() {
    // console.log(Date.now())
    const dataRecieved = await teamList(
      this.state.activePage,
      this.state.itemsCountPerPage
    );
    SetTeamData(dataRecieved);
    // console.log(Date.now())
    // console.log("HERE: ")
    // console.log(dataRecieved)
    const newData = dataRecieved
    this.setState({ data: newData });
  }

  render() {
    // console.log('DAta: ')
    // console.log(this.state.data.forEach(o=>console.log(o)))
    const teamList = (TeamData.length !== 0 ? TeamData : TeamDatas).filter(
      team => team.id < 10
    );
    console.log(this.state.data.forEach(o => console.log(o)));

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} style={{ padding: "0" }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Team{" "}
                <small className="text-muted">Members</small>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createTeamBtn" href="/team/add-member">
                    Create Team
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th style= {{width: "5%"}}scope="col">ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Joining Date</th>
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
                          name="id"
                          value={this.state.id}
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
                          value={this.state.first_name}
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
                          value={this.state.last_name}
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
                          value={this.state.email}
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
                          name="mobile"
                          value={this.state.mobile}
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
                          value={this.state.joining}
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
                      {/* </form> */}
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((team, index) => (
                            // {teamList.map((team, index) =>
                            <TeamRow key={index} team={team} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((team, index) => (
                          <TeamRow key={index} team={team} />
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

export default ViewTeam;
