import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { SoulsSettingsData,SetSoulsSettingsData } from "./Datas";
// import Pagination from "react-js-pagination";
import UpdateSettingsPopUp from "./UpdateSettingsPopUp.js";
import {soulsSettingsList} from "./AdminFunctions";

class SoulsSettingsRow extends Component {
  state = {
    showModal: false,
    soulsSettings: this.props.soulsSettings
  };

  componentWillReceiveProps(nextProps) {
    this.setState({soulsSettings: this.props.soulsSettings})
  }

  displayModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <tr key={this.state.soulsSettings.souls_setting_id}>
        <td>
          <Link style={{ paddingLeft: "14px" }} onClick={this.displayModal}>
            <i className="fa fa-pencil" data-toggle="tooltip" title="Update Settings"></i>
          </Link>
        </td>
        <th>{this.state.soulsSettings.souls_setting_id}</th>
        <th>{this.state.soulsSettings.type}</th>
        <th>{this.state.soulsSettings.url}</th>
        <th>{this.state.soulsSettings.description}</th>
        <td>{this.state.soulsSettings.hostname}</td>
        <td>{this.state.soulsSettings.username}</td>
        <td>{this.state.soulsSettings.password}</td>
        <UpdateSettingsPopUp
          souls_setting_id={this.state.soulsSettings.souls_setting_id}
          show={this.state.showModal}
          handleClose={this.closeModal}
        />
      </tr>
    );
  }
}

class SoulsSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activePage: 1,
      // itemsCountPerPage: 10,

      data: [],
      count: 0,
      souls_setting_id: 0,
      type: "",
      url: "",
      description: "",
      hostname: "",
      username: "",
      password: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
  }



  async componentDidMount() {
    const dataRecieved = await soulsSettingsList(
    //   this.state.activePage,
    //   this.state.itemsCountPerPage
    );
    SetSoulsSettingsData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData});
  }


//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   onSubmit= async (e)=> {
//     e.preventDefault();
//     const searchUser = {
//       firstname: this.state.first_name,
//       lastname: this.state.last_name,
//       status: this.state.status
//     };

//     const dataRecieved = await searchTeamHasRole(searchUser);
//     SetTeamHasRoleData(dataRecieved);
//     const newData = dataRecieved
//     this.setState({ data: newData });
//   }

//   handlePageChange = async (pageNumber) => {
//     console.log(`pageNumber is ${pageNumber}`);
//     // this.setState({ activePage: pageNumber });
//     console.log(`active page is ${this.state.activePage}`);

//     const dataRecieved = await teamHasRoleList(
//       pageNumber,
//       this.state.itemsCountPerPage
//     );
//     SetTeamHasRoleData(dataRecieved.data);
//     // console.log(dataPageRecieved)
//     const newData = dataRecieved.data
//     // console.log("newdata = " + newData.length)
//     this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
//   }
  render() {
    console.log(this.state.data)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} style={{ padding: "0" }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> SOULS Settings{" "}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>  
                      <th scope="col">ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">URL</th>
                      <th scope="col">Description</th>
                      <th scope="col">Host Name</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((soulsSettings, index) => (
                            // {teamList.map((team, index) =>
                            <SoulsSettingsRow key={index} soulsSettings={soulsSettings} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((soulsSettings, index) => (
                          <SoulsSettingsRow key={index} soulsSettings={soulsSettings} />
                        ))}
                      </React.Fragment>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SoulsSettings;
