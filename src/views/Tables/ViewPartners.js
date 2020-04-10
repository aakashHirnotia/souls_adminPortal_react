


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
      <tr key={this.state.partner.partner_id}>
        <th>{this.state.partner.partner_id}</th>
        <td>{this.state.partner.partner_name}</td>
        {/* <td>{this.state.partner.lastname}</td>
        <td>{this.state.partner.middlename}</td> */}
        <td>{this.state.partner.partner_email}</td>
        <td>{this.state.partner.partner_mobileno}</td>
        {/* <td>{this.state.partner.partner_alternate_mobileno}</td> */}
        <td>{this.state.partner.partner_address}</td>
        <td>{this.state.partner.pincode}</td>
        <td>{this.state.partner.latitude}</td>
        <td>{this.state.partner.Longitude}</td>
        <td>{this.state.partner.Rate}</td>
        <td>{this.state.partner.Commission_Type}</td>
        <td>{this.state.partner.Onboard_Date}</td>
        <td>{this.state.partner.UpdatedAt}</td>
        <td>{this.state.partner.CreatedAt}</td>
        <td>{this.state.partner.created_by}</td>
        <td>{this.state.partner.updated_by}</td>
        <td>{this.state.partner.partner_gender}</td>
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

      partner_id: "",
      partner_name: "",
      // lastname: "",
      // middlename: "",
      partner_email: "",
      partner_mobileno: "",
      // partner_alternate_mobileno: "",
      partner_address: "",
      pincode: "",
      latitude: "",
      Longitude: "",
      Rate: "",
      Commission_Type: "",
      Onboard_Date: "",
      UpdatedAt: "",
      CreatedAt: "",
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
    SetPartnerData(dataRecieved);
    const newData = dataRecieved
    this.setState({ data: newData });
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit= async (e)=> {
    e.preventDefault();
    const searchUser = {
      partner_id: this.state.partner_id,
      partner_name: this.state.partner_name,
      // lastname: this.state.lastname,
      // middlename: this.state.middlename,
      partner_email: this.state.partner_email,
      partner_mobileno: this.state.partner_mobileno,
      // partner_alternate_mobileno: this.state.partner_alternate_mobileno,
      partner_address: this.state.partner_address,
      pincode: this.state.pincode,
      latitude: this.state.latitude,
      Longitude: this.state.Longitude,
      Rate: this.state.Rate,
      Commission_Type: this.state.Commission_Type,
      Onboard_Date: this.state.Onboard_Date,
      UpdatedAt: this.state.UpdatedAt,
      CreatedAt: this.state.CreatedAt,
      created_by: this.state.created_by,
      updated_by: this.state.updated_by,
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
    SetPartnerData(dataRecieved);
    // console.log(dataPageRecieved)
    const newData = dataRecieved
    this.setState({ data: newData, activePage: pageNumber });
  }
  render() {
    // console.log('DAta: ')
    // console.log(this.state.data.forEach(o=>console.log(o)))
    // const teamList = (TeamData.length !== 0 ? TeamData : TeamDatas).filter(
    //   team => team.id < 10
    // );
    // console.log(this.state.data.forEach(o => console.log(o)));

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
                      <th scope="col">Partner ID</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col">Last Name</th>
                      <th scope="col">Middle Name</th> */}
                      <th scope="col">Email</th>
                      <th scope="col">Mobile No</th>
                      {/* <th scope="col">Alterrnate Mobile No</th> */}
                      <th scope="col">Address</th>
                      <th scope="col">Pincode</th>
                      <th scope="col">Latitude</th>
                      <th scope="col">Longitude</th>
                      <th scope="col">Per Visit Commission</th>
                      <th scope="col">Commission Type</th>
                      <th scope="col">Onboard Date</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Updated By</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Gender</th>
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
                          name="partner_id"
                          value={this.state.partner_id}
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
                          name="partner_address"
                          value={this.state.partner_address}
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
                          name="latitude"
                          value={this.state.latitude}
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
                          name="Longitude"
                          value={this.state.Longitude}
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
                          name="Rate"
                          value={this.state.Rate}
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
                          name="Commission_Type"
                          value={this.state.Commission_Type}
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
                          name="Onboard_Date"
                          value={this.state.Onboard_Date}
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
                          name="created_by"
                          value={this.state.created_by}
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
                          name="updated_by"
                          value={this.state.updated_by}
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
                          name="partner_gender"
                          value={this.state.partner_gender}
                          onChange={this.onChange}
                        />
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
                  itemsCountPerPage={this.itemsCountPerPage}
                  totalItemsCount={50} // check
                  pageRangeDisplayed={5}
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