// import React, { Component } from 'react';

// class ViewCommunicationTempelate extends Component {
//     //state = {  }
//     render() { 
//         return ( <div> Communication Tempelate</div> );
//     }
// }
 
// export default ViewCommunicationTempelate;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { CommTempelateData, SetCommTempelateData } from "./Data";
import Pagination from "react-js-pagination";
import { communicationTempelateList, searchCommunicationTempelate } from "../AdminFunctions";

class CommunicationTempelateRow extends Component {
  state = {
    communicationTempelate: this.props.communicationTempelate
  };

  componentWillReceiveProps(nextProps) {
    this.setState({communicationTempelate: this.props.communicationTempelate})
  }

  getIcon = (status) => {
    return  (status === 'Active' || status === 'active') ? 'fa fa-check-square fa-lg' :
            (status === 'Inactive' || status === 'inactive') ? 'fa fa-window-close-o fa-lg' :
            'primary'
  }

  getColor = (status) => {
    return  (status === 'Active' || status === 'active')  ? {color:"green"} :
            (status === 'Inactive' || status === 'inactive') ? {color:"red"} :
            {color:"black"}
  }

  getTitle = (status) => {
    return  (status === 'Active' || status === 'active')  ? "active" :
            (status === 'Inactive' || status === 'inactive') ? "inactive" :
            "not defined"
  }

  render() {
    return (
      <tr key={this.state.communicationTempelate.communicationTempelateID}>
        <td>
          <Link to={`/admin/view-communication-tempelate/${this.props.communicationTempelate.communicationTempelateID}`}>
            <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
          </Link>{" "}
          <Link
            style={{ paddingLeft: "14px" }}
            to={`/admin/edit-communication-tempelate/${this.props.communicationTempelate.communicationTempelateID}`}
          >
            <i className="fa fa-pencil" data-toggle="tooltip" title="edit"></i>
          </Link>
        </td>
        <th>{this.state.communicationTempelate.communicationTempelateID}</th>
        <td>{this.state.communicationTempelate.type}</td>
        <td>{this.state.communicationTempelate.trigger_time}</td>
        <td>{this.state.communicationTempelate.trigger_for}</td>
        <td>{this.state.communicationTempelate.smsContent}</td>
        <td>{this.state.communicationTempelate.subject}</td>
        <td>{this.state.communicationTempelate.emailContent}</td>
        <td className={this.getIcon(this.state.communicationTempelate.status)} style={this.getColor(this.state.communicationTempelate.status)} data-toggle="tooltip" title={this.getTitle(this.state.communicationTempelate.status)}></td>
      </tr>
    );
  }
}

class ViewCommunicationTempelate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,

      data: [],
      count: 0,
      communicationTempelateID: "",
      type: "",
      trigger_time: "",
      trigger_for: "",
      smsContent: "",
      subject: "",
      emailContent: "",
      status: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }



  async componentDidMount() {
    const dataRecieved = await communicationTempelateList(
      this.state.activePage,
      this.state.itemsCountPerPage
    );
    SetCommTempelateData(dataRecieved.data);
    const newData = dataRecieved.data
    this.setState({ data: newData, count: dataRecieved.count});
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit= async (e)=> {
    e.preventDefault();
    const searchCommTempelate = {
      communicationTempelateID: this.state.communicationTempelateID,
      type: this.state.type,
      trigger_time: this.state.trigger_time,
      trigger_for: this.state.trigger_for,
      smsContent: this.state.smsContent,
      subject: this.state.subject,
      emailContent: this.state.emailContent,
      status: this.state.status
    };

    const dataRecieved = await searchCommunicationTempelate(searchCommTempelate);
    SetCommTempelateData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData });
  }

  handlePageChange = async (pageNumber) => {
    console.log(`pageNumber is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    console.log(`active page is ${this.state.activePage}`);

    const dataRecieved = await communicationTempelateList(
      pageNumber,
      this.state.itemsCountPerPage
    );
    SetCommTempelateData(dataRecieved.data);
    // console.log(dataPageRecieved)
    const newData = dataRecieved.data
    this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} style={{ padding: "0" }}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Communication Tempelate{" "}
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="create" href="/admin/add-communication-tempelate" style={{color: "white"}}>
                    Create
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>
                      <th scope="col">ID</th>
                      <th scope="col">Type</th>
                      <th scope="col">Trigger Time</th>
                      <th scope="col">Trigger For</th>
                      <th scope="col">SMS Content</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Email Content</th>
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
                          name="communicationTempelateID"
                          value={this.state.communicationTempelateID}
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
                          name="type"
                          value={this.state.type}
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
                          name="trigger_time"
                          value={this.state.trigger_time}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="10">10 min.</option>
                          <option value="30">30 min.</option>
                          <option value="60">1 hour</option>
                        </select>
                      </td>
                      <td scope="col">
                        <select
                          type="search"
                          class="form-control mr-sm-2"
                          id=""
                          placeholder=""
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="trigger_for"
                          value={this.state.trigger_for}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="customer">Customer</option>
                          <option value="partner">Partner</option>
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
                          name="smsContent"
                          value={this.state.smsContent}
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
                          name="subject"
                          value={this.state.subject}
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
                          name="emailContent"
                          value={this.state.emailContent}
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
                          <option ></option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((communicationTempelate, index) => (
                            // {teamList.map((communicationTempelate, index) =>
                            <CommunicationTempelateRow key={index} communicationTempelate={communicationTempelate} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((communicationTempelate, index) => (
                          <CommunicationTempelateRow key={index} communicationTempelate={communicationTempelate} />
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

export default ViewCommunicationTempelate;
