import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import PasswordPopUp from "../PasswordPopUp.js";
// import { TeamData, TeamDatas, SetTeamData } from "../TeamData";
// import Pagination from "react-js-pagination";
// import { teamList, search } from "../UserFunctions";

class TeamRow extends Component {
  state = {
    showModal: false,
    team: this.props.team,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ team: this.props.team });
  }

  getIcon = (status) => {
    return status === "Active" || status === "active"
      ? "fa fa-check-square fa-lg"
      : status === "Inactive" || status === "inactive"
      ? "fa fa-window-close-o fa-lg"
      : status === "Deleted" || status === "deleted"
      ? "fa fa-trash"
      : "primary";
  };

  getColor = (status) => {
    return status === "Active" || status === "active"
      ? { color: "green" }
      : status === "Inactive" || status === "inactive"
      ? { color: "red" }
      : status === "Deleted" || status === "deleted"
      ? { color: "red" }
      : { color: "black" };
  };

  getTitle = (status) => {
    return status === "Active" || status === "active"
      ? "active"
      : status === "Inactive" || status === "inactive"
      ? "inactive"
      : status === "Deleted" || status === "deleted"
      ? "deleted"
      : "not defined";
  };

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
            <i
              className="fa fa-key"
              data-toggle="tooltip"
              title="change password"
            ></i>
          </Link>
          {/* <br /> */}
          <Link
            // style={{ paddingLeft: "14px" }}
            to={`/team/edit-member/${this.props.team.teamid}`}
          >
            <i className="fa fa-pencil" data-toggle="tooltip" title="edit" ></i>
          </Link>
        </td>
        <th>{this.state.team.teamid}</th>
        <td style={{ width: "10%" }}>{this.state.team.firstname}</td>
        <td style={{ width: "10%" }}>{this.state.team.lastname}</td>
        <td>{this.state.team.email}</td>
        <td>{this.state.team.mobileno}</td>
        <td style={{ width: "12%" }}>{this.state.team.joining_date}</td>
        <td
          className={this.getIcon(this.state.team.status)}
          style={this.getColor(this.state.team.status)}
          data-toggle="tooltip"
          title={this.getTitle(this.state.team.status)}
        ></td>
        <PasswordPopUp
          email={this.state.team.email}
          show={this.state.showModal}
          handleClose={this.closeModal}
        />
      </tr>
    );
  }
}

export default TeamRow;
