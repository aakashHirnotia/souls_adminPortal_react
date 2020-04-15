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

  displayModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <tr key={this.state.team.teamid}>
        <td>
          <Link to={`/team/view-member/${this.props.team.teamid}`}>
            <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
          </Link>
          <Link style={{ padding: "10px" }} onClick={this.displayModal}>
            <i className="fa fa-key" data-toggle="tooltip" title="change password"></i>
          </Link>{" "}
          <br />
          <Link
            style={{ paddingLeft: "14px" }}
            to={`/team/edit-member/${this.props.team.teamid}`}
          >
            <i className="fa fa-pencil" data-toggle="tooltip" title="edit"></i>
          </Link>
        </td>
        <th>{this.state.team.teamid}</th>
        <td style={{ width: "10%" }}>{this.state.team.firstname}</td>
        <td style={{ width: "10%" }}>{this.state.team.lastname}</td>
        <td>{this.state.team.email}</td>
        <td>{this.state.team.mobileno}</td>
        <td style={{ width: "12%" }}>{this.state.team.Joining_Date}</td>
        <td className={this.getIcon(this.state.team.status)} style={this.getColor(this.state.team.status)} data-toggle="tooltip" title={this.getTitle(this.state.team.status)}></td>
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
      count: 0,
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      joining: "",
      status: "",
      mobile: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }



  async componentDidMount() {
    const dataRecieved = await teamList(
      this.state.activePage,
      this.state.itemsCountPerPage
    );
    console.log("HEYA")
    console.log(dataRecieved.data)
    SetTeamData(dataRecieved.data);
    const newData = dataRecieved.data
    this.setState({ data: newData, count: dataRecieved.count});
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit= async (e)=> {
    e.preventDefault();
    const searchUser = {
      id: this.state.id,
      firstname: this.state.first_name,
      lastname: this.state.last_name,
      email: this.state.email,
      joining: this.state.joining,
      status: this.state.status,
      role: this.state.role,
      mobileno: this.state.mobile
    };

    const dataRecieved = await search(searchUser);
    SetTeamData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData });
  }

  handlePageChange = async (pageNumber) => {
    console.log(`pageNumber is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    console.log(`active page is ${this.state.activePage}`);

    const dataRecieved = await teamList(
      pageNumber,
      this.state.itemsCountPerPage
    );
    SetTeamData(dataRecieved.data);
    // console.log(dataPageRecieved)
    const newData = dataRecieved.data
    this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
  }
  render() {
    // console.log('DAta: ')
    // console.log(this.state.data.forEach(o=>console.log(o)))
    // const teamList = (TeamData.length !== 0 ? TeamData : TeamDatas).filter(
    //   team => team.id < 10
    // );
    // console.log(this.state.data.forEach(o => console.log(o))); 
      console.log(this.state.count)
      console.log(this.state.data)
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
                      <th scope="col">Actions</th>
                      <th style= {{width: "5%"}} scope="col">ID</th>
                      <th style= {{width: "8%"}} scope="col">First Name</th>
                      <th style= {{width: "8%"}} scope="col">Last Name</th>
                      <th style= {{width: "18%"}} scope="col">Email</th>
                      <th style= {{width: "15%"}} scope="col">Mobile</th>
                      <th style= {{width: "25%"}} scope="col">Joining Date</th>
                      <th style= {{width: "5%"}} scope="col">Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <form onSubmit={this.onSubmit}> */}
                      <td scope="col">
                        <button type="submit" className="btn btn-outline-primary" 
                          onClick={this.onSubmit}>
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
                          <option value="" selected>{this.state.status!==""?"Clear":"Select"}</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Deleted">Deleted</option>
                        </select>
                      </td>
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
                  itemsCountPerPage={10}
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
