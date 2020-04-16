import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { AssignPartnerData, SetAssignPartnerData } from "../Datas";
import Pagination from "react-js-pagination";
import { AssignPartnerList, searchAssignPart } from "../Functions";


class AssignPartnerRow extends Component {
  state = {
    assignPartner: this.props.assignPartner
  };

  componentWillReceiveProps(nextProps) {
    this.setState({assignPartner: this.props.assignPartner})
  }

  getIcon = (status) => {
    return  (status === 'Pending' || status === 'pending') ? 'fa fa-check-square fa-lg' :
            (status === 'Accepted' || status === 'accepted') ? 'fa fa-window-close-o fa-lg' :
            (status === 'Attended' || status === 'attended') ? 'fa fa-trash' :
            (status === 'Cancelled' || status === 'cancelled') ? 'fa fa-trash' :
            (status === 'Rejected' || status === 'rejected') ? 'fa fa-trash' :
            'primary'
  }

  getColor = (status) => {
    return  (status === 'Pending' || status === 'pending') ? {color:"yellow"}:
            (status === 'Accepted' || status === 'accepted') ? {color:"green"} :
            (status === 'Attended' || status === 'attended') ? {color:"green"} :
            (status === 'Cancelled' || status === 'cancelled') ? {color:"red"} :
            (status === 'Rejected' || status === 'rejected') ? {color:"red"} :
            {color:"black"}
  }

    render() {
      return (
        <tr key={this.state.assignPartner.customer_souls_id}>
          <td>
            <Link to={`/assignpartner/view-member/${this.props.assignPartner.id}`}>
              <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/assignpartner/edit-member/${this.props.assignPartner.id}`}
            >
              <i className="fa fa-pencil" data-toggle="tooltip" title="update"></i>
            </Link>
          </td>
          <th style={{ width: "12%" }}>{this.state.assignPartner.customer_souls_id}</th>
          <td style={{ width: "15%" }}>{this.state.assignPartner.customer_name}</td>
          <td style={{ width: "15%" }}>{this.state.assignPartner.customer_mobile_no}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.Slot_Time}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.Slot_Date}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.partner_souls_id}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.partner_name}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.partner_mobileno}</td>
          <td style={{ width: "10%" }}>{this.state.assignPartner.CreatedAt}</td>
          <td className={this.getIcon(this.state.assignPartner.status)} style={this.getColor(this.state.assignPartner.status)}></td>
        </tr>
      );
    }
  }
  
  class AssignPartners extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 1,
        itemsCountPerPage: 10,
  
        data: [],
        count: 0,
        customer_souls_id:"",
        customer_name: "",
        customer_mobile_no: "",
        Slot_Time:"",
        Slot_Date:"",
        partner_souls_id:"",
        partner_name:"",
        partner_mobileno:"",
        CreatedAt: "",
        status: "",
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
    }
    
    async componentDidMount() {
      const dataRecieved = await AssignPartnerList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetAssignPartnerData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, count: dataRecieved.count });
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit= async (e) =>{
      e.preventDefault();
      const searchAssignPartner = {
        customer_souls_id: this.state.customer_souls_id,
        customer_name: this.state.customer_name,
        customer_mobile_no: this.state.customer_mobile_no,
        Slot_Time: this.state.Slot_Time,
        Slot_Date: this.state.Slot_Date,
        partner_souls_id: this.state.partner_souls_id,
        partner_name: this.state.partner_name,
        partner_mobileno: this.state.partner_mobileno,
        CreatedAt: this.state.CreatedAt,
        status: this.state.status
      };
  
      const dataRecieved = await searchAssignPart(searchAssignPartner);
      SetAssignPartnerData(dataRecieved);
      const newData = dataRecieved
      this.setState({ data: newData });
    }
  
    handlePageChange = async (pageNumber)=> {
      console.log(`pageNumber is ${pageNumber}`);
      console.log(`active page is ${this.state.activePage}`);
  
      const dataRecieved = await AssignPartnerList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetAssignPartnerData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
    }
  
  
    render() {
      // console.log(this.state.data.forEach(o=>console.log(o)))
      const AssignPartnerList = AssignPartnerData.filter(
        assignPartner => assignPartner.id < 10
      );
  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12} style={{ padding: "0" }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>Assign Partner Table{" "}
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
                            name="Slot_Time"
                            value={this.state.Slot_Time}
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
                            name="Slot_Date"
                            value={this.state.Slot_Date}
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
                            name="CreatedAt"
                            value={this.state.CreatedAt}
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
  
                      {this.state.data ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((assignPartner, index) => (
                              <AssignPartnerRow key={index} assignPartner={assignPartner} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((assignPartner, index) => (
                          <AssignPartnerRow key={index} assignPartner={assignPartner} />
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
  
  export default AssignPartners;
