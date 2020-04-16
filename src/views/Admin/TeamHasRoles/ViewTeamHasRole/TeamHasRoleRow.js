import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { TeamHasRoleData, TeamHasRoleDatas, SetTeamHasRoleData } from "../Data";
import Pagination from "react-js-pagination";
import UpdateRolePopUp from "../UpdateRolePopUp.js";
import { teamHasRoleList, searchTeamHasRole } from "../../AdminFunctions";
import queryString from "query-string";

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
          <td>
            <Link style={{ paddingLeft: "14px" }} onClick={this.displayModal}>
              <i className="fa fa-pencil" data-toggle="tooltip" title="Update Role"></i>
            </Link>
          </td>
          <th>{this.state.teamHasRole.teamid}</th>
          <th>{this.state.teamHasRole.first_name}</th>
          <th>{this.state.teamHasRole.last_name}</th>
          <td>{this.getRole(this.state.teamHasRole.team_has_role_id)}</td>
          <td>{this.state.teamHasRole.CreatedAt}</td>
          <td>{this.state.teamHasRole.UpdatedAt}</td>
          <td className={this.getIcon(this.state.teamHasRole.status)} style={this.getColor(this.state.teamHasRole.status)} data-toggle="tooltip" title={this.getTitle(this.state.teamHasRole.status)}></td>
          <UpdateRolePopUp
            teamid={this.state.teamHasRole.teamid}
            show={this.state.showModal}
            handleClose={this.closeModal}
          />
        </tr>
      );
    }
  }
  

  export default TeamHasRoleRow