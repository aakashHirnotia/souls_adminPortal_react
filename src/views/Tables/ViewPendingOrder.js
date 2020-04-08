import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { PendingOrderData, SetPendingOrderData } from "./Datas";
import Pagination from "react-js-pagination";
import { PendingOrderList, searchPendingOrder } from "./Functions";

class PendingOrderRow extends Component {
    state = {
      showModal: false,
      PendingOrder: this.props.PendingOrder
    };

    displayModal = () => {
      this.setState({ showModal: true });
    };
    closeModal = () => {
      this.setState({ showModal: false });
    };
    render() {
      return (
        <tr key={this.state.PendingOrder.Order_ID}>
          <th>{this.state.PendingOrder.Order_ID}</th>
          <th>{this.state.PendingOrder.customer_ID}</th>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.souls_ID}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.customer_name}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.no_of_therapists_required}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.therapist_gender}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.massage_for}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.slot_time}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.slot_date}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.address}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.mobile_no}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.latitude}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.longitude}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.create_at}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.is_order_confermed}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.transaction_ID}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.total_order_amount}</td>
          <td>
            <Link to={`/PendingOrder/view-member/${this.props.PendingOrder.Order_ID}`}>
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              style={{ paddingLeft: "10px" }}
              to={`/pendingorder/edit-member/${this.props.PendingOrder.Order_ID}`}
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </td>
        </tr>
      );
    }
  }
  
  class ViewPendingOrder extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePage: 1,
        itemsCountPerPage: 10,
  
        data: [],
        Order_ID: "",
        customer_ID:"",
        souls_ID:"",
        customer_name:"",
        no_of_therapists_required:"",
        therapist_gender:"",
        massage_for:"",
        slot_time:"",
        slot_date:"",
        massage_duration:"",
        address:"",
        pincode:"",
        mobile_no:"",
        latitude: "",
        longitude: "",
        create_at: "",
        is_order_confermed: "",
        transaction_ID: "",
        total_order_amount:"",
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit(e) {
      e.preventDefault();
      const searchPanding = {
        Order_ID: this.state.Order_ID,
        customer_ID: this.state.customer_ID,
        souls_ID: this.state.souls_ID,
        customer_name:this.state.customer_name,
        no_of_therapists_required: this.state.no_of_therapists_required,
        therapist_gender: this.state.therapist_gender,
        massage_for: this.state.massage_for,
        slot_time: this.state.slot_time,
        slot_date: this.state.slot_date,
        massage_duration: this.state.massage_duration,
        address: this.state.address,
        pincode: this.state.pincode,
        mobile_no: this.state.mobile_no,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        create_at: this.state.create_at,
        is_order_confermed: this.state.is_order_confermed,
        transaction_ID: this.state.transaction_ID,
        total_order_amount: this.state.total_order_amount,
    };
  
      searchPendingOrder(searchPanding);
    }
  
    async handlePageChange(pageNumber) {
      console.log(`pageNumber is ${pageNumber}`);
      this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataPageRecieved = await PendingOrderList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetPendingOrderData(dataPageRecieved);
      this.setState({ data: dataPageRecieved });
    }
  
    async componentDidMount() {
      // console.log(Date.now())
      const dataRecieved = await PendingOrderList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetPendingOrderData(dataRecieved);
      this.setState({ data: dataRecieved });
    }
  
    render() {
      // console.log('DAta: ')
      // console.log(this.state.data.forEach(o=>console.log(o)))
      const PendingOrderList = PendingOrderData.filter(
        PendingOrder => PendingOrder.Order_ID < 10
      );
      console.log(this.state.data.forEach(o => console.log(o)));
  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12} style={{ padding: "0" }}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> PendingOrder{" "}
                  <small className="text-muted">Members</small>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Souls ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">No of Therapists Required</th>
                        <th scope="col">Therapists Gender</th>
                        <th scope="col">Massage For</th>
                        <th scope="col">Slot Time</th>
                        <th scope="col">Slot Date</th>
                        <th scope="col">Massage Duration</th>
                        <th scope="col">Address</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Is Order Confermed</th>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Total Order Amount</th>
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
                            name="Order_ID"
                            value={this.state.Order_ID}
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
                            name="customer_ID"
                            value={this.state.customer_ID}
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
                            name="souls_ID"
                            value={this.state.souls_ID}
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
                            name="Customer_name"
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
                            name="o_of_therapists_required"
                            value={this.state.no_of_therapists_required}
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
                            name="therapist_gender"
                            value={this.state.therapist_gender}
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
                            name="massage_for"
                            value={this.state.massage_for}
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
                            name="slot_time"
                            value={this.state.slot_time}
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
                            name="slot_date"
                            value={this.state.slot_date}
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
                            name="massage_duration"
                            value={this.state.massage_duration}
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
                          <select
                            type="search"
                            class="form-control mr-sm-2"
                            id=""
                            placeholder=""
                            aria-label="Search for..."
                            style={{ height: "30px" }}
                            name="mobile_no"
                            value={this.state.mobile_no}
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
                            name="latitude"
                            value={this.state.latitude}
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
                            name="longitude"
                            value={this.state.longitude}
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
                            name="create_at"
                            value={this.state.create_at}
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
                            name="is_order_confermed"
                            value={this.state.is_order_confermed}
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
                            name="transaction_ID"
                            value={this.state.transaction_ID}
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
                            name="total_order_amount"
                            value={this.state.total_order_amount}
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
                      </tr>
  
                      {this.state.data ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((Pendingorder, index) => (
                              // {PendingorderList.map((Pendingorder, index) =>
                              <PendingOrderRow key={index} Pendingorder={Pendingorder} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {PendingOrderList.map((Pendingorder, index) => (
                            <PendingOrderRow key={index} Pendingorder={Pendingorder} />
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
  
  export default ViewPendingOrder;
  