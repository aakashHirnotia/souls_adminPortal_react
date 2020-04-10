import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { customerData, SetCustomerData } from "./Datas";
import Pagination from "react-js-pagination";
import { customerList, searchCust } from "./Functions";


class CustomerRow extends Component {
  state = {
    customer: this.props.customer
  };

  componentWillReceiveProps(nextProps) {
    this.setState({customer: this.props.customer})
  }

  getIcon = (status) => {
    return  (status === true) ? 'fa fa-check-square fa-lg' :
            (status === false) ? 'fa fa-window-close-o fa-lg' :
            'primary'
  }

  getColor = (status) => {
    return  (status === true )  ? {color:"green"} :
            (status === false ) ? {color:"red"} :
            {color:"black"}
  }

    render() {
      // console.log(this.props.customer)
      return (
        <tr key={this.state.customer.customer_souls_id}>
          <th>{this.state.customer.customer_souls_id}</th>
          <td style={{ width: "20%" }}>{this.state.customer.customer_name}</td>
          <td style={{ width: "20%" }}>{this.state.customer.customer_mobile_no}</td>
          <td style={{ width: "10%" }}>{this.state.customer.customer_gender}</td>
          <td style={{ width: "10%" }}>{this.state.customer.customer_email}</td>
          <td style={{ width: "10%" }}>{this.state.customer.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.customer.CreatedAt}</td>
          <td className={this.getIcon(this.state.customer.status)} style={this.getColor(this.state.customer.status)}></td>
          <td>
            <Link to={`/customer/view-member/${this.props.customer.customer_id}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/customer/edit-member/${this.props.customer.customer_id}`}
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
        count: 0,
        id: "",
        customer_souls_id:"",
        customer_name: "",
        customer_mobile_no: "",
        customer_gender: "",
        customer_email: "",
        customer_address: "",
        pincode: "",
        CreatedAt: "",
        registrated_source: "",
        Last_Access_Time: "",
        status: false,
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
    }
    
    async componentDidMount() {
      const dataRecieved = await customerList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetCustomerData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, count: dataRecieved.count });
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit= async (e) =>{
      e.preventDefault();
      const searchCustomer = {
        customer_souls_id: this.state.customer_souls_id,
        customer_name: this.state.customer_name,
        customer_mobile_no: this.state.customer_mobile_no,
        customer_gender: this.state.customer_gender,
        customer_email: this.state.customer_email,
        pincode: this.state.pincode,
        CreatedAt: this.state.CreatedAt,
        status: this.state.status
      };
  
      const dataRecieved = await searchCust(searchCustomer);
      SetCustomerData(dataRecieved);
      const newData = dataRecieved
      this.setState({ data: newData });
    }
  
    handlePageChange = async (pageNumber)=> {
      console.log(`pageNumber is ${pageNumber}`);
      // this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataRecieved = await customerList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetCustomerData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
    }
  
  
    render() {
      // console.log(this.state.data.forEach(o=>console.log(o)))
      const customerList = customerData.filter(
        customer => customer.id < 10
      );
      // console.log(this.state.data.forEach(o => console.log(o)));
  
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
                        <th scope="col">SOULS ID</th>
                        <th style= {{width: "10%"}} scope="col">Name</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Create Time</th>
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
                        </td><td scope="col">
                          <input
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="customer_gender"
                            value={this.state.customer_gender}
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
                            name="customer_email"
                            value={this.state.customer_email}
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
                            onChange={(e) => this.setState({status: !this.state.status.value})}
                          >
                           
                            <option value={true} >true</option>
                            <option value={false}>false</option>
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
                              <CustomerRow key={index} customer={customer} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                        {this.state.data.length!=0 && this.state.data.map((customer, index) => (
                          <CustomerRow key={index} customer={customer} />
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
  
  export default ViewCustomer;
