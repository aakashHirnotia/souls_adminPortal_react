import React, {Component} from 'react'
import { Modal, Button} from 'react-bootstrap'
import {updateSettings} from '../AdminFunctions'
import {SoulsSettingsData} from './Data'
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

}

export default class UpdateRolePopUp extends Component{
    constructor(props){
        super(props);
        this.state= {
            status: false,
            souls_setting_id: this.props.souls_setting_id,
            type: "",
            url: "",
            urlError: "",
            description: "",
            descriptionError: "",
            hostname: "",
            hostnameError: "",
            username: "",
            usernameError: "",
            password: "",
            passwordError: "",
            isEditable: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        if (SoulsSettingsData.length == 0) {
          window.location.href = "/souls-settings";
        }
        this.setState({
          isEditable: window.location.pathname.includes("/souls-settings"),
        });
    }

    // componentDidMount() {
    //     if (this.state.isEditable) {
    //       const soulsSettings = SoulsSettingsData.find(
    //         (soulsSettings) => soulsSettings.souls_setting_id.toString() === this.props.match.params.id
    //       );
    //       this.setState({
    //         url: soulsSettings.url,
    //         description: soulsSettings.description,
    //         hostname: soulsSettings.hostname,
    //         username: soulsSettings.username,
    //         password: soulsSettings.password
    //       });
    //     }
    //   }

    onChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value })
    }

    validate = () => {
        let urlError = "";
        let descriptionError = "";
        let hostnameError = "";
        let usernameError = "";
        let passwordError = "";
        if (!this.state.url) {
          urlError = "URL can't be empty";
        }
        if (!this.state.description) {
          descriptionError = "Description can't be empty";
        }
        if (!this.state.password) {
          passwordError = "Password can't be empty";
        }
        if (!this.state.hostname) {
          hostnameError = "Host Name can't be empty";
        }
        if (!this.state.username) {
          usernameError = "User Name can't be empty";
        }
    
        if (
          urlError ||
          descriptionError ||
          hostnameError ||
          usernameError ||
          passwordError
        ) {
          this.setState({
            urlError ,
            descriptionError ,
            hostnameError ,
            usernameError ,
            passwordError
          });
          return false;
        }
        return true;
      };
    

    onSubmit=async (e)=>{
        e.preventDefault()
        const isValid = this.validate();
        console.log("isVlais: "+isValid)
        if (isValid) {
            const user = {
                souls_setting_id: this.state.souls_setting_id,
                url: this.state.url,
                description: this.state.description,
                hostname: this.state.hostname,
                username: this.state.username,
                password: this.state.password,
            };
            console.log("changing");
            let changed =await updateSettings(user);
            console.log(changed)
            if(changed) {
                console.log(" changed succesfully")
                this.setState({status: true})
            }
            this.setState(intialState);
        }
        
    }

    render(){
        return(
            <div>
                {this.state.status ?
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit} style={{padding:"5px", margin:"10px"}}>
                            <FormGroup row className="my-0">
                                <Label htmlFor="url">URL</Label>
                                <br></br>
                                <Input type="text" id="url" placeholder="URL Updated" name="url" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Label htmlFor="description">Description</Label>
                                <br></br>
                                <Input type="text" id="description" placeholder="Description Updated" name="description" style={{padding: "8px"}} onChange={this.onChange} disabled={true}/>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Label htmlFor="hostname">Host Name</Label>
                                <br></br>
                                <Input type="text" id="hostname" placeholder="Hostname Updated" name="hostname" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Label htmlFor="username">User Name</Label>
                                <br></br>
                                <Input type="text" id="username" placeholder="username" name="username" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <Label htmlFor="password">Password</Label>
                                <br></br>
                                <Input type="text" id="password" placeholder="password" name="password" style={{padding: "8px"}} onChange={this.onChange} disabled={true}/>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{color: "green", textAlign: "left"}}>
                            <h2> Settings Updated</h2>
                        </div>
                        {/* <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button> */}
                    </Modal.Footer>
                </Modal>
                :
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}  style={{padding:"5px", margin:"10px"}}>
                            <FormGroup row className="my-0">
                                <label htmlFor="url">URL</label>
                                <br></br>
                                <Input type="text" id="url" placeholder="URL" name="url" style={{padding: "8px"}} onChange={this.onChange} />
                                <div style={{ fontSize: 10, color: "red" }}>
                                    {this.state.urlError}
                                </div>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="description">Description</label>
                                <br></br>
                                <Input type="text" id="description" placeholder="Description" name="description" style={{padding: "8px"}} onChange={this.onChange} />
                                <div style={{ fontSize: 10, color: "red" }}>
                                    {this.state.descriptionError}
                                </div>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="hostname">Host Name</label>
                                <br></br>
                                <Input type="text" id="hostname" placeholder="Hostname" name="hostname" style={{padding: "8px"}} onChange={this.onChange} />
                                <div style={{ fontSize: 10, color: "red" }}>
                                    {this.state.hostnameError}
                                </div>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="username">User Name</label>
                                <br></br>
                                <Input type="text" id="username" placeholder="Username" name="username" style={{padding: "8px"}} onChange={this.onChange} />
                                <div style={{ fontSize: 10, color: "red" }}>
                                    {this.state.usernameError}
                                </div>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="password">Password</label>
                                <br></br>
                                <Input type="text" id="password" placeholder="Password" name="password" style={{padding: "8px"}} onChange={this.onChange} />
                                <div style={{ fontSize: 10, color: "red" }}>
                                    {this.state.passwordError}
                                </div>
                            </FormGroup>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Update
                    </Button>
                    </Modal.Footer>
                </Modal>
                }
            </div>

        );
    }

}