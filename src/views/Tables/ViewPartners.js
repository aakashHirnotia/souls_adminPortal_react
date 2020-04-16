


import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { PartnerData, SetPartnerData } from "./Datas";
import Pagination from "react-js-pagination";
import { partnerList, searchPartner } from "./Functions";

class PartnerRow extends Component {
  state = { 
    partner: this.props.partner
  };

  componentWillReceiveProps(nextProps) {
    this.setState({partner: this.props.partner})
  }

  render() {
    return (
      <tr key={this.state.partner.partner_souls_id}>
        <td>
          <Link to={`/tables/view-partner-member/${this.props.partner.partner_id}`}>
            <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
          </Link>{" "}
          <Link
            style={{ paddingLeft: "14px" }}
            to={`/tables/edit-partner/${this.props.partner.partner_id}`}
          >
            <i className="fa fa-pencil" data-toggle="tooltip" title="edit"></i>
          </Link>
        </td>
        <th>{this.state.partner.partner_souls_id}</th>
        <td>{this.state.partner.partner_name}</td>
        <td>{this.state.partner.partner_email}</td>
        <td>{this.state.partner.partner_mobileno}</td>
        <td>{this.state.partner.pincode}</td>
        <td>{this.state.partner.rate}</td>
        <td>{this.state.partner.commission_type}</td>
        <td>{this.state.partner.updated_at}</td>
        <td>{this.state.partner.created_at}</td>
        <td>{this.state.partner.partner_gender}</td>
      </tr>
    );
  }
}

class ViewPartners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,

      data: [],
      count: 0,
      partner_id: "",
      partner_souls_id:"",
      partner_name: "",
      partner_email: "",
      partner_mobileno: "",
      partner_address: "",
      pincode: "",
      latitude: "",
      longitude: "",
      rate: "",
      commission_type: "",
      onboard_date: "",
      updated_at: "",
      created_at: "",
      created_by: "",
      updated_by: "",
      partner_gender: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }



  async componentDidMount() {
    const dataRecieved = await partnerList(
      this.state.activePage,
      this.state.itemsCountPerPage
    );
    SetPartnerData(dataRecieved.data);
    const newData = dataRecieved.data
    this.setState({ data: newData,count: dataRecieved.count });
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit= async (e)=> {
    e.preventDefault();
    const searchUser = {
      partner_souls_id: this.state.partner_souls_id,
      partner_name: this.state.partner_name,
      partner_email: this.state.partner_email,
      partner_mobileno: this.state.partner_mobileno,
      pincode: this.state.pincode,
      rate: this.state.rate,
      commission_type: this.state.commission_type,
      updated_at: this.state.updated_at,
      created_at: this.state.created_at,
      partner_gender: this.state.partner_gender
    };

    const dataRecieved = await searchPartner(searchUser);
    SetPartnerData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData });
  }

  handlePageChange = async (pageNumber) => {
    console.log(`pageNumber is ${pageNumber}`);
    // this.setState({ activePage: pageNumber });
    console.log(`active page is ${this.state.activePage}`);

    const dataRecieved = await partnerList(
      pageNumber,
      this.state.itemsCountPerPage
    );
    SetPartnerData(dataRecieved.data);
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
                <i className="fa fa-align-justify"></i> Partner's{" "}
                <small className="text-muted">Table</small>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ position: "absolute", right: "20px" }}
                >
                  <a className="createPartnerBtn" style={{color: "white"}} href="/tables/add-partner">
                    Create Partner
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Actions</th>
                      <th scope="col">SOULS ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">PIN Code</th>
                      <th scope="col">Per Visit Commission</th>
                      <th scope="col">Commission Type</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Gender</th>  
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
                          name="partner_email"
                          value={this.state.partner_email}
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
                          name="pincode"
                          value={this.state.pincode}
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
                          name="rate"
                          value={this.state.rate}
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
                          name="commission_type"
                          value={this.state.commission_type}
                          onChange={this.onChange}
                        >
                          <option ></option>
                          <option value="%">%</option>
                          <option value="Flat">Flat</option>
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
                          name="updated_at"
                          value={this.state.updated_at}
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
                          name="created_at"
                          value={this.state.created_at}
                          onChange={this.onChange}
                        />
                      </td>
                      <td scope="col">
                        <select
                          type="search"
                          class="form-control mr-sm-2"
                          id=""
                          placeholder="select"
                          aria-label="Search for..."
                          style={{ height: "30px" }}
                          name="partner_gender"
                          value={this.state.partner_gender}
                          onChange={this.onChange}
                        >
                          <option value="" selected>{this.state.partner_gender!==""?"Clear":"Select"}</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                    </tr>

                    {this.state.data ? (
                      <React.Fragment>
                        {this.state.data &&
                          this.state.data.map((partner, index) => (
                            // {partnerList.map((partner, index) =>
                            <PartnerRow key={index} partner={partner} />
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((partner, index) => (
                          <PartnerRow key={index} partner={partner} />
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

export default ViewPartners;