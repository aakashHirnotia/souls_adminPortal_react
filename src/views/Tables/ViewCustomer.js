import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { customerData, SetCustomerData } from "./Datas";
import Pagination from "react-js-pagination";
import { customerList, searchCust } from "./Functions";

class CustomerRow extends Component {
  state = {
    customer: this.props.customer
  };

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

    render() {
      return (
        <tr key={this.state.customer.customerid}>
          <th>{this.state.customer.customerid}</th>
          <th>{this.state.customer.customersouldid}</th>
          <td style={{ width: "20%" }}>{this.state.customer.name}</td>
          <td style={{ width: "20%" }}>{this.state.customer.mobileno}</td>
          <td style={{ width: "10%" }}>{this.state.customer.gender}</td>
          <td style={{ width: "10%" }}>{this.state.customer.email}</td>
          <td style={{ width: "20%" }}>{this.state.customer.address}</td>
          <td style={{ width: "10%" }}>{this.state.customer.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.customer.createtime}</td>
          <td style={{ width: "10%" }}>{this.state.customer.registrationsource}</td>
          <td style={{ width: "10%" }}>{this.state.customer.lastaccesstime}</td>
          <td className={this.getIcon(this.state.team.status)} style={this.getColor(this.state.team.status)}></td>
          <td>
            <Link to={`/customer/view-member/${this.props.customer.customerid}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/customer/edit-member/${this.props.customer.customerid}`}
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </td>
        </tr>
      );
    }
  }
  
  class ViewCustomer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 1,
        itemsCountPerPage: 10,
  
        data: [],
        id: "",
        soulsID:"",
        name: "",
        mobileno: "",
        gender: "",
        email: "",
        address: "",
        pincode: "",
        createtime: "",
        registrationsource: "",
        lastaccesstime: "",
        status: "",
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    
    async componentDidMount() {
      const dataRecieved = await customerList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetCustomerData(dataRecieved);
      const newData = dataRecieved
      this.setState({ data: newData });
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit(e) {
      e.preventDefault();
      const searchCustomer = {
        id: this.state.id,
        soulsID: this.state.soulsID,
        name: this.state.name,
        mobileno: this.state.mobileno,
        gender: this.state.gender,
        email: this.state.email,
        address: this.state.address,
        pincode: this.state.pincode,
        createtime: this.state.createtime,
        registrationsource: this.state.registrationsource,
        lastaccesstime: this.state.lastaccesstime,
        status: this.state.status
      };
  
      searchCust(searchCustomer);
    }
  
    async handlePageChange(pageNumber) {
      console.log(`pageNumber is ${pageNumber}`);
      this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataPageRecieved = await customerList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetCustomerData(dataPageRecieved);
      this.setState({ data: dataPageRecieved });
    }
  
    async componentDidMount() {
      const dataRecieved = await customerList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetCustomerData(dataRecieved);
      this.setState({ data: dataRecieved });
    }
  
    render() {
      // console.log('DAta: ')
      // console.log(this.state.data.forEach(o=>console.log(o)))
      const customerList = customerData.filter(
        customer => customer.id < 10
      );
      console.log(this.state.data.forEach(o => console.log(o)));
  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12} style={{ padding: "0" }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Customer Table{" "}
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Souls ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Registration Source</th>
                        <th scope="col">Last Access Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                            name="soulsID"
                            value={this.state.soulsID}
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
                            name="name"
                            value={this.state.name}
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
                            name="mobileno"
                            value={this.state.mobileno}
                            onChange={this.onChange}
                          />
                        </td><td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="gender"
                            value={this.state.gender}
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
                            name="address"
                            value={this.state.address}
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
                            name="createtime"
                            value={this.state.createtime}
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
                            name="registrationsource"
                            value={this.state.registrationsource}
                            onChange={this.onChange}
                          />
                        </td><td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="lastaccesstime"
                            value={this.state.lastaccesstime}
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
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
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
                      </tr>
  
                      {this.state.data ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((customer, index) => (
                              // {customerList.map((customer, index) =>
                              <customerRow key={index} customer={customer} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {customerList.map((customer, index) => (
                            <customerRow key={index} customer={customer} />
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
  
  export default ViewCustomer;