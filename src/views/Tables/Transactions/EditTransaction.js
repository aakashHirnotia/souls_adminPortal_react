import React, { Component } from "react";
import { updateTransaction } from "../Functions";
// import DateCalender from "./DateCalender";
import {TransactionData, SetTransactionData} from '../Datas'
import {Card,CardBody,CardHeader,Col,FormGroup,Input,Label} from "reactstrap";
import DateCalender from "./../Slot_Date_calender"
import TimePicker from 'react-time-picker';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';

const intialState = {
  order_id: "",
  order_idError: "",
  customer_id:"",
  customer_idError:"",
  customer_souls_id: "",
  customer_souls_idError: "",
  customer_name: "",
  customer_nameError: "",
  number_of_therapist:"",
  number_of_therapistError:"",
  therapist_gender:"",
  therapist_genderError:"",
  massage_for:"",
  massage_forError:"",
  Slot_Time:'10:00',
  Slot_TimeError:"",
  Slot_Date:"",
  Slot_DateError:"",
  massage_duration:"",
  massage_durationError:"",
  customer_address: "",
  customer_addressError: "",
  pincode: "",
  pincodeError: "",
  latitude:"",
  latitudeError:"",
  longitude:"",
  longitudeError:"",
  CreatedAt: "",
  CreatedAtError: "",
  merchant_transaction_id:"",
  merchant_transaction_idError:"",
  // payment_gateway_mode:"",
  // payment_gateway_modeError:"",
  // transaction_mode:"",
  // transaction_modeError:"",
  // bank_type:"",
  // bank_typeError:"",
  // payment_gateway_id:"",
  // payment_gateway_idError:"",
  // total_order_amount:"",
  // total_order_amountError:"",
  isEditable:"",
  errors: {}
};

class EditTransaction extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    if(TransactionData.length==0) {
      window.location.href='/transactions'
    }
    this.setState({isEditable: window.location.pathname.includes('/edit-member')})
  }
  
  componentDidMount(){
    if(this.state.isEditable){
      const transaction = TransactionData.find( transaction => transaction.order_id.toString() === this.props.match.params.id)
      this.setState({
        number_of_therapist: transaction.number_of_therapist,
        therapist_gender: transaction.therapist_gender,
        massage_for: transaction.massage_for,
        Slot_Time: transaction.Slot_Time,
        Slot_Date: transaction.Slot_Date,
        massage_duration: transaction.massage_duration,
        customer_address: transaction.customer_address,
        pincode: transaction.pincode,
        latitude: transaction.latitude,
        longitude: transaction.longitude,
        merchant_transaction_id: transaction.merchant_transaction_id,
        payment_gateway_mode: transaction.payment_gateway_mode,
        transaction_mode: transaction.transaction_mode,
        bank_type: transaction.bank_type,
        payment_gateway_id: transaction.payment_gateway_id,
        total_order_amount: transaction.total_order_amount,
    })
  }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeDate = (date) => {
    console.log("HELLLO");
    this.setState({ Slot_Date: date });
  };

  onChangeTime = Slot_Time => this.setState({ Slot_Time })

  validate = () => {
    let number_of_therapistError = "";
    let therapist_genderError = "";
    let massage_forError = "";
    let Slot_TimeError = "";
    let Slot_DateError = "";
    let massage_durationError = "";
    let customer_addressError = "";
    let pincodeError = "";
    let latitudeError = "";
    let longitudeError = "";
    let merchant_transaction_idError = "";
    // let payment_gateway_modeError = "";
    // let transaction_modeError = "";
    // let bank_typeError = "";
    // let payment_gateway_idError = "";
    // let total_order_amountError = "";
    if (!this.state.number_of_therapist) {
      number_of_therapistError = "Can't be empty";
    }
    if (!this.state.therapist_gender) {
      therapist_genderError = "Can't be empty";
    }
    if (!this.state.massage_for) {
      massage_forError = "Can't be empty";
    }
    if (!this.state.Slot_Time) {
      Slot_TimeError = "Can't be empty";
    }
    if (!this.state.Slot_Date) {
      Slot_DateError = "Can't be empty";
    }
    if (!this.state.massage_duration) {
      massage_durationError = "Can't be empty";
    }
    if (!this.state.customer_address) {
        customer_addressError = "Can't be empty";
    }
    if (!this.state.pincode) {
      pincodeError = "Can't be empty";
    }
    if (!this.state.latitude) {
        latitudeError = "Can't be empty";
    }
    if (!this.state.longitude) {
        longitudeError = "Can't be empty";
    }
    if (!this.state.merchant_transaction_id) {
        merchant_transaction_idError = "Can't be empty";
    }
    // if (!this.state.payment_gateway_mode) {
    //     payment_gateway_modeError = "Can't be empty";
    // }
    // if (!this.state.transaction_mode) {
    //     transaction_modeError = "Can't be empty";
    // }
    // if (!this.state.bank_type) {
    //     bank_typeError = "Can't be empty";
    // }
    // if (!this.state.payment_gateway_id) {
    //     payment_gateway_idError = "Can't be empty";
    // }
    // if (!this.state.total_order_amount) {
    //     total_order_amountError = "Can't be empty";
    // }

    if (
        number_of_therapistError ||
        therapist_genderError ||
        massage_forError ||
        Slot_TimeError ||
        Slot_DateError ||
        massage_durationError ||
        customer_addressError ||
        pincodeError ||
        latitudeError ||
        longitudeError ||
        merchant_transaction_idError 
        // payment_gateway_modeError ||
        // transaction_modeError ||
        // bank_typeError ||
        // payment_gateway_idError ||
        // total_order_amountError
    ) {
      this.setState({
        number_of_therapistError,
        therapist_genderError,
        massage_forError,
        Slot_TimeError,
        Slot_DateError,
        massage_durationError,
        customer_addressError,
        pincodeError,
        latitudeError,
        longitudeError,
        merchant_transaction_idError
        // payment_gateway_modeError,
        // transaction_modeError,
        // bank_typeError,
        // payment_gateway_idError,
        // total_order_amountError
      });
      return false;
    }
    return true;
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("Submit fucntion called - ")

    console.log("Submit fucntion called - 2 " + this.state.isEditable)
      const isValid = this.validate();
      console.log("isValid = "+isValid)
      if (isValid) {
        const updatedUser = {
            number_of_therapist: this.state.number_of_therapist,
            therapist_gender: this.state.therapist_gender,
            massage_for: this.state.massage_for,
            Slot_Time: this.state.Slot_Time,
            Slot_Date: this.state.Slot_Date,
            massage_duration: this.state.massage_duration,
            customer_address: this.state.customer_address,
            pincode: this.state.pincode,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            merchant_transaction_id: this.state.merchant_transaction_id,
        };
        console.log("data------" )
        console.log(updatedUser)
        console.log(updatedUser.Slot_Date)
        // console.log("data------" + updatedUser.Slot_Time)
        updateTransaction(updatedUser).then(res => {
          this.props.history.push(`/transactions`);
        });
        this.setState(intialState);   
    }


  }


  render() {
    return (
        <div>
          <Card>
            <CardHeader>
              <strong>Update Transaction: </strong>
              <button 
                      className="btn btn-primary-primary" style={{position:"absolute", right:"15px"}}
                >
                  <a className="createCustomerBtn" href="/transactions"> Back </a>
              </button>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="no of therapists">Number of Therapists</Label>
                      <Input
                        type="text"
                        pattern="[0-9]*"
                        placeholder="No of Therapists"
                        name="number_of_therapist"
                        value={this.state.number_of_therapist}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.number_of_therapistError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="Therapist Gender">Therapist Gender</Label>
                      <select
                        className="form-control"
                        // placeholder="Therapist Gender"
                        name="therapist_gender"
                        value={this.state.therapist_gender}
                        onChange={this.onChange}
                      >
                        <option value="">Select</option>
                        {/* <option value="" selected>{this.state.therapist_gender!==""?"Clear":"Select"}</option> */}
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other" >Other</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.therapist_genderError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="massage for">Massage For</Label>
                      <select
                        className="form-control"
                        name="massage_for"
                        value={this.state.massage_for}
                        onChange={this.onChange}
                      >
                        <option value="">Select</option>
                        {/* <option value="" selected>{this.state.massage_for!==""?"Clear":"Select"}</option> */}
                        <option value="myself">Myself</option>
                        <option value="friend">Friend</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.massage_forError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label htmlFor="slot time">Slot Time</Label>
                      <br/>
                        <TimePicker
                        onChange={this.onChangeTime}
                        value={this.state.Slot_Time}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.Slot_TimeError}
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="massage duration">Massage Duration</Label>
                      <Input
                        type="text"
                        placeholder="Massage Duration"
                        name="massage_duration"
                        value={this.state.massage_duration}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.massage_durationError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="Pincode">Pincode</Label>
                      <Input
                        type="text"
                        placeholder="Pincode"
                        name="pincode"
                        value={this.state.pincode}
                        onChange={this.onChange}
                        
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.pincodeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="merchant transaction id">Merchant Transaction ID</Label>
                      <Input
                        type="text"
                        placeholder="Merchant TXN ID"
                        name="merchant_transaction_id"
                        value={this.state.merchant_transaction_id}
                        onChange={this.onChange}
                        disabled={true}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.merchant_transaction_idError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="slot date">Slot Date</Label>{" "}
                        <br />
                        <DateCalender
                          value={this.state.Slot_Date}
                          onChange={this.onChangeDate}
                        />
                        <div style={{ fontSize: 10, color: "red" }}>
                          {this.state.Slot_DateError}
                        </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        type="text"
                        placeholder="Latitude"
                        name="latitude"
                        value={this.state.latitude}
                        onChange={this.onChange}
                        // disabled={true}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.latitudeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        type="text"
                        placeholder="Longitude"
                        name="longitude"
                        value={this.state.longitude}
                        onChange={this.onChange}
                        // disabled={true}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.longitudeError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="textarea"
                        placeholder="Address"
                        name="customer_address"
                        value={this.state.customer_address}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.customer_addressError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </form>
          
            </CardBody>
          </Card>
        </div>
      )
    }
}

export default EditTransaction ;