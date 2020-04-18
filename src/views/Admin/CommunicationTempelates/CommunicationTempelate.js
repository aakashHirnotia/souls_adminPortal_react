import React, { Component } from "react";
import { createCommTempelate,updateCommTempelate } from "../AdminFunctions";
import { CommTempelateData } from './Data'
import TextEditor from "./TextEditor.js";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const intialState = {
  communicationTempelateID: "",
  type: "",
  typeError: "",
  trigger_time: "",
  trigger_timeError: "",
  trigger_for: "",
  trigger_forError: "",
  smsContent: "",
  smsContentError: "",
  subject: "",
  subjectError: "",
  emailContent: "",
  emailContentError: "",
  status: "",
  statusError: "",
  isEditable: "",
  errors: {}
};

class CommunicationTempelate extends Component {
  constructor() {
    super();
    this.state = intialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({isEditable: window.location.pathname.includes('/edit-communication-tempelate')})
  }
  
  componentDidMount(){

    if(this.state.isEditable){
      const communicationTempelate = CommTempelateData.find( communicationTempelate => communicationTempelate.templ_id.toString() === this.props.match.params.id)
      this.setState({
        communicationTempelateID: communicationTempelate.templ_id,
        type: communicationTempelate.templ_type,
        trigger_time: communicationTempelate.trigger_time,
        trigger_for: communicationTempelate.trigger_for,
        smsContent: communicationTempelate.sms_content,
        subject: communicationTempelate.subject,
        emailContent: communicationTempelate.email_content,
        status: communicationTempelate.status
        
      })
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let typeError = "";
    let trigger_timeError = "";
    let trigger_forError = "";
    let smsContentError = "";
    let subjectError = "";
    let emailContentError = "";
    let statusError = "";
    if (!this.state.type) {
      typeError = "Type can't sbe empty";
    }
    if (!this.state.trigger_time) {
      trigger_timeError = "Choose Trigger Time";
    }
    if (!this.state.trigger_for) {
      trigger_forError = "Choose Trigger For";
    }
    if (!this.state.smsContent) {
      smsContentError = "SMS Content can't be empty";
    }
    if (!this.state.subject) {
      subjectError = "Subject can't be empty";
    }
    if (!this.state.emailContent) {
      emailContentError = "Email Content can't be empty";
    }
    if (!this.state.status) {
      statusError = "Choose Status";
    }
    if (
      typeError ||
      trigger_timeError ||
      trigger_forError ||
      smsContentError ||
      subjectError ||
      emailContentError ||
      statusError
    ) {
      this.setState({
        typeError,
        trigger_timeError,
        trigger_forError,
        smsContentError,
        subjectError,
        emailContentError,
        statusError
      });
      return false;
    }
    return true;
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("Submit fucntion called - ")

    console.log("Submit fucntion called - 2 " + this.state.isEditable)
    if(this.state.isEditable){
      const isValid = this.validate();
      console.log("isValid = "+isValid)
      if (isValid) {
        const updatedCommTempelate = {
          communicationTempelateID: this.state.communicationTempelateID,
          type: this.state.type,
          trigger_time: this.state.trigger_time,
          trigger_for: this.state.trigger_for,
          smsContent: this.state.smsContent,
          subject: this.state.subject,
          emailContent: this.state.emailContent,
          status: this.state.status
        };
        updateCommTempelate(updatedCommTempelate).then(res => {
          this.props.history.push(`/admin/CommunicationTempelate`);
        });
        this.setState(intialState);
        
      }

    }
    else{
      const isValid = this.validate();
      if (isValid) {
        const newCommTempelate = {
            type: this.state.type,
            trigger_time: this.state.trigger_time,
            trigger_for: this.state.trigger_for,
            smsContent: this.state.smsContent,
            subject: this.state.subject,
            emailContent: this.state.emailContent,
            status: this.state.status
        };
        createCommTempelate(newCommTempelate).then(res => {
          this.props.history.push(`/admin/CommunicationTempelate`);
        });
        this.setState(intialState);
        
      }
    }
  }

  onChangeEmailContent = (data) => {
    this.setState({emailContent: data})
  }

  render() {
    return (
      <div>{!this.state.isEditable ? (
        <div>
          <Card>
            <CardHeader>
              <strong>Create Communication Tempelate</strong>
              <button
                className="btn btn-primary btn-sm"
                style={{ position: "absolute", right: "20px" }}
              >
                <a className="createTeamBtn" href="/admin/CommunicationTempelate">
                  Back
                </a>
              </button>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="type">Type</Label>
                      <Input
                        type="text"
                        id="type"
                        placeholder="Type"
                        name="type"
                        value={this.state.type}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.typeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="trigger_time">Trigger Time</Label>
                      <select
                        className="form-control"
                        name="trigger_time"
                        value={this.state.trigger_time}
                        onChange={this.onChange}
                      >
                          <option disabled={true}></option>
                          <option value="10">10 min.</option>
                          <option value="30">30 min.</option>
                          <option value="60">1 hour</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.trigger_timeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                    <Label htmlFor="trigger_for">Trigger For</Label>
                      <select
                        className="form-control"
                        name="trigger_for"
                        value={this.state.trigger_for}
                        onChange={this.onChange}
                      >
                          <option disabled={true}></option>
                          <option value="customer">Customer</option>
                          <option value="partner">Partner</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.trigger_forError}
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        type="textarea"
                        id="subject"
                        placeholder="Subject"
                        name="subject"
                        value={this.state.subject}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.subjectError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="smsContent">SMS Content</Label>
                      <Input
                        type="textarea"
                        id="smsContent"
                        placeholder="SMS Content"
                        name="smsContent"
                        value={this.state.smsContent}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.smsContentError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                    <Label htmlFor="status">Status</Label>
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                      >
                        <option disabled={true}></option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.statusError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="emailContent">Email Content</Label>
                      <TextEditor value={this.state.emailContent} onChange={this.onChangeEmailContent}/>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.emailContentError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  {/* <Col xs="4"></Col> */}
                  <Col xs="4">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                  {/* <Col xs="4"></Col> */}
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </div>
      )
        :
      (
        <div>
          <Card>
            <CardHeader>
              <strong>Edit Communication Tempelate</strong>
              <button
                className="btn btn-primary btn-sm"
                style={{ position: "absolute", right: "20px" }}
              >
                <a className="createTeamBtn" href="/admin/CommunicationTempelate">
                  Back
                </a>
              </button>
            </CardHeader>
            <CardBody>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="type">Type</Label>
                      <Input
                        type="text"
                        id="type"
                        placeholder="type"
                        name="type"
                        value={this.state.type}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.typeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                      <Label htmlFor="trigger_time">Trigger Time</Label>
                      <select
                        className="form-control"
                        name="trigger_time"
                        value={this.state.trigger_time}
                        onChange={this.onChange}
                      >
                          <option disabled={true}></option>
                          <option value="10">10 min.</option>
                          <option value="30">30 min.</option>
                          <option value="60">1 hour</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.trigger_timeError}
                      </div>
                    </FormGroup>
                  </div>
                  <div className="col-md-4">
                    <FormGroup>
                    <Label htmlFor="trigger_for">Trigger For</Label>
                      <select
                        className="form-control"
                        name="trigger_for"
                        value={this.state.trigger_for}
                        onChange={this.onChange}
                      >
                          <option disabled={true}></option>
                          <option value="customer">Customer</option>
                          <option value="partner">Partner</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.trigger_forError}
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        type="textarea"
                        id="subject"
                        placeholder="subject"
                        name="subject"
                        value={this.state.subject}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.subjectError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="smsContent">SMS Content</Label>
                      <Input
                        type="textarea"
                        id="smsContent"
                        placeholder="SMS Content"
                        name="smsContent"
                        value={this.state.smsContent}
                        onChange={this.onChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.smsContentError}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                    <Label htmlFor="status">Status</Label>
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                      >
                        <option disabled={true}></option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.statusError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="my-0">
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="emailContent">Email Content</Label>
                      <TextEditor value={this.state.emailContent} onChange={this.onChangeEmailContent}/>
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.emailContentError}
                      </div>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-0">
                  {/* <Col xs="4"></Col> */}
                  <Col xs="4">
                    <FormGroup>
                      <button type="submit" className="btn btn-outline-primary">
                        Submit
                      </button>
                    </FormGroup>
                  </Col>
                  {/* <Col xs="4"></Col> */}
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </div>)}
      </div>
    );
    
  }
}

export default CommunicationTempelate;
