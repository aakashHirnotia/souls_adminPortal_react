// import React, { Component } from 'react';

// class Partners extends Component {
//     //state = {  }
//     render() { 
//         return ( <div> Partners tables</div> );
//     }
// }
 
// export default Partners;


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
    this.setState({team: this.props.team})
  }

  render() {
    return (
      <tr key={this.state.partner.partnerid}>
        <th>{this.state.partner.partnerid}</th>
        <td>{this.state.partner.firstname}</td>
        <td>{this.state.partner.lastname}</td>
        <td>{this.state.partner.middlename}</td>
        <td>{this.state.partner.partner_email}</td>
        <td>{this.state.partner.partner_mobileno}</td>
        <td>{this.state.partner.partner_alternate_mobileno}</td>
        <td>{this.state.partner.partner_address}</td>
        <td>{this.state.partner.pincode}</td>
        <td>{this.state.partner.latitude}</td>
        <td>{this.state.partner.longitude}</td>
        <td>{this.state.partner.per_visit_price_commission}</td>
        <td>{this.state.partner.commission_type}</td>
        <td>{this.state.partner.Onboard_Date}</td>
        <td>{this.state.partner.UpdatedAt}</td>
        <td>{this.state.partner.CreatedAt}</td>
        <td>{this.state.partner.Created_By}</td>
        <td>{this.state.partner.Updated_By}</td>
        <td>
          <Link to={`/partner/view-partner/${this.props.partner.partnerid}`}>
            <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
          </Link>{" "}
          <Link
            style={{ paddingLeft: "14px" }}
            to={`/partner/edit-partner/${this.props.partner.partnerid}`}
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

      partnerid: "",
      firstname: "",
      lastname: "",
      middlename: "",
      partner_email: "",
      partner_mobileno: "",
      partner_alternate_mobileno: "",
      partner_address: "",
      pincode: "",
      latitude: "",
      longitude: "",
      per_visit_price_commission: "",
      commission_type: "",
      Onboard_Date: "",
      UpdatedAt: "",
      CreatedAt: "",
      Created_By: "",
      Updated_By: "",
      Partner_Gender: "",
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
      partnerid: this.state.partnerid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      partner_email: this.state.partner_email,
      partner_mobileno: this.state.partner_mobileno,
      partner_alternate_mobileno: this.state.partner_alternate_mobileno,
      partner_address: this.state.partner_address,
      pincode: this.state.pincode,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      per_visit_price_commission: this.state.per_visit_price_commission,
      commission_type: this.state.commission_type,
      Onboard_Date: this.state.Onboard_Date,
      UpdatedAt: this.state.UpdatedAt,
      CreatedAt: this.state.CreatedAt,
      Created_By: this.state.Created_By,
      Updated_By: this.state.Updated_By,
      Partner_Gender: this.state.Partner_Gender
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
                  <a className="createPartnerBtn" href="/table/add-partner">
                    Create Partner
                  </a>
                </button>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Partner ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Middle Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">Alterrnate Mobile No</th>
                      <th scope="col">Partner Address</th>
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
                          name="partnerid"
                          value={this.state.partnerid}
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
                          name="firstname"
                          value={this.state.firstname}
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
                          name="lastname"
                          value={this.state.lastname}
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
                          name="middlename"
                          value={this.state.middlename}
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
                          name="partner_alternate_mobileno"
                          value={this.state.partner_alternate_mobileno}
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
                          name="longitude"
                          value={this.state.longitude}
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
                          name="per_visit_price_commission"
                          value={this.state.per_visit_price_commission}
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
                          name="commission_type"
                          value={this.state.commission_type}
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
                          name="Created_By"
                          value={this.state.Created_By}
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
                          name="Updated_By"
                          value={this.state.Updated_By}
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
                          name="Partner_Gender"
                          value={this.state.Partner_Gender}
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