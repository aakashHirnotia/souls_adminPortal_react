import React, {Component} from 'react'
import { Modal, Button} from 'react-bootstrap'
import {updateSettings} from '../AdminFunctions'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label
  } from "reactstrap";


export default class UpdateRolePopUp extends Component{
    constructor(props){
        super(props);
        this.state= {
            status: false,
            soulsSettingsID: this.props.soulsSettingsID,
            type: "",
            url: "",
            description: "",
            hostname: "",
            username: "",
            password: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit=async (e)=>{
        e.preventDefault()
        const user = {
            soulsSettingsID: this.state.soulsSettingsID,
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
        
    }

    render(){
        return(
            <div>
                {this.state.status ?
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color:"green"}}>{this.state.type} Settings Updated !! </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <FormGroup row className="my-0">
                                <label htmlFor="url" style={{color:"green"}}>URL</label>
                                <br></br>
                                <input type="text" id="url" placeholder="url" name="url" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="description" style={{color:"green"}}>Description</label>
                                <br></br>
                                <input type="text" id="description" placeholder="description" name="description" style={{padding: "8px"}} onChange={this.onChange} disabled={true}/>
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="hostname" style={{color:"green"}}>Host Name</label>
                                <br></br>
                                <input type="text" id="hostname" placeholder="hostname" name="hostname" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                            </FormGroup>
                            <FormGroup>
                                <Col xs="6">
                                    <FormGroup>
                                        <label htmlFor="username" style={{color:"green"}}>User Name</label>
                                        <br></br>
                                        <input type="text" id="username" placeholder="username" name="username" style={{padding: "8px"}} onChange={this.onChange} disabled={true} />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <label htmlFor="password" style={{color:"green"}}>Password</label>
                                        <br></br>
                                        <input type="text" id="password" placeholder="password" name="password" style={{padding: "8px"}} onChange={this.onChange} disabled={true}/>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                :
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update {this.state.type} Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <FormGroup row className="my-0">
                                <label htmlFor="url">URL</label>
                                <br></br>
                                <input type="text" id="url" placeholder="url" name="url" style={{padding: "8px"}} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="description">Description</label>
                                <br></br>
                                <input type="text" id="description" placeholder="description" name="description" style={{padding: "8px"}} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup row className="my-0">
                                <label htmlFor="hostname">Host Name</label>
                                <br></br>
                                <input type="text" id="hostname" placeholder="hostname" name="hostname" style={{padding: "8px"}} onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Col xs="6">
                                    <FormGroup>
                                        <label htmlFor="username">User Name</label>
                                        <br></br>
                                        <input type="text" id="username" placeholder="username" name="username" style={{padding: "8px"}} onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <label htmlFor="password">Password</label>
                                        <br></br>
                                        <input type="text" id="password" placeholder="password" name="password" style={{padding: "8px"}} onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
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