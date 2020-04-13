import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { PendingOrderData, SetPendingOrderData } from "./Datas";
import Pagination from "react-js-pagination";
import { PendingOrderList, searchPendingOrder } from "./Functions";

class PendingOrderRow extends Component {
    state = {
      PendingOrder: this.props.PendingOrder
    };
    componentWillReceiveProps(nextProps) {
      this.setState({PendingOrder: this.props.PendingOrder})
    }

    getIcon = (is_order_confirmed) => {
      return  (is_order_confirmed === true) ? 'fa fa-check-square fa-lg' :
              (is_order_confirmed === false) ? 'fa fa-window-close-o fa-lg' :
              'primary'
    }
  
    getColor = (is_order_confirmed) => {
      return  (is_order_confirmed === true )  ? {color:"green"} :
              (is_order_confirmed === false ) ? {color:"red"} :
              {color:"black"}
    }

    render() {
      return (
        <tr key={this.state.PendingOrder.customer_souls_id}>
          <td>
            <Link to={`/pendingorder/view-member/${this.props.PendingOrder.order_id}`}>
              <i className="fa fa-eye" data-toggle="tooltip" title="view"></i>
            </Link>
          </td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.customer_souls_id}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.customer_name}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.Slot_Time}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.Slot_Date}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.massage_duration}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.pincode}</td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.CreatedAt}</td>
          <td className={this.getIcon(this.state.PendingOrder.is_order_confirmed)} style={this.getColor(this.state.PendingOrder.is_order_confirmed)}></td>
          <td style={{ width: "10%" }}>{this.state.PendingOrder.merchant_transaction_id}</td>
          <td style={{ width: "20%" }}>{this.state.PendingOrder.total_order_amount}</td>
          
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
        count: 0,
        souls_ID:"",
        customer_name:"",
        slot_time:"",
        slot_date:"",
        massage_duration:"",
        pincode:"",
        create_at: "",
        is_order_confermed: "",
        transaction_ID: "",
        total_order_amount:"",
        errors: {}
      };
      this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
      const dataRecieved = await PendingOrderList(
        this.state.activePage,
        this.state.itemsCountPerPage
      );
      SetPendingOrderData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, count: dataRecieved.count});
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    onSubmit = async(e)=> {
      e.preventDefault();
      const searchPanding = {
        souls_ID: this.state.souls_ID,
        customer_name:this.state.customer_name,
        slot_time: this.state.slot_time,
        slot_date: this.state.slot_date,
        massage_duration: this.state.massage_duration,
        pincode: this.state.pincode,
        create_at: this.state.create_at,
        is_order_confermed: this.state.is_order_confermed,
        transaction_ID: this.state.transaction_ID,
        total_order_amount: this.state.total_order_amount,
    };
      const dataRecieved = await searchPendingOrder(searchPanding);
      SetPendingOrderData(dataRecieved);
      const newData = dataRecieved
      this.setState({ data: newData });
    }
  
    handlePageChange = async (pageNumber) =>{
      console.log(`pageNumber is ${pageNumber}`);
      this.setState({ activePage: pageNumber });
      console.log(`active page is ${this.state.activePage}`);
  
      const dataRecieved = await PendingOrderList(
        pageNumber,
        this.state.itemsCountPerPage
      );
      SetPendingOrderData(dataRecieved.data);
      const newData = dataRecieved.data
      this.setState({ data: newData, activePage: pageNumber, count: dataRecieved.count });
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
                  <i className="fa fa-align-justify"></i> Pending Order Table{" "}
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Actions</th>
                        <th scope="col">SOULS ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Slot Time</th>
                        <th scope="col">Slot Date</th>
                        <th scope="col">Massage Duration</th>
                        <th scope="col">PIN Code</th>
                        <th scope="col">Create Time</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Merchant TXN ID</th>
                        <th scope="col">Amount</th>
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
                            onChange={(e) => this.setState({is_order_confermed: !this.state.is_order_confermed.value})}
                          >
                            <option value={true} >Confirmed</option>
                            <option value={false}>Pending</option>
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

                        
                      </tr>
  
                      {this.state.data ? (
                        <React.Fragment>
                          {this.state.data &&
                            this.state.data.map((PendingOrder, index) => (
                              // {PendingorderList.map((PendingOrder, index) =>
                              <PendingOrderRow key={index} PendingOrder={PendingOrder} />
                            ))}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {this.state.data.length!=0 && this.state.data.map((PendingOrder, index) => (
                            <PendingOrderRow key={index} PendingOrder={PendingOrder} />
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
                    totalItemsCount={this.state.count} 
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
  
  export default ViewPendingOrder;
  