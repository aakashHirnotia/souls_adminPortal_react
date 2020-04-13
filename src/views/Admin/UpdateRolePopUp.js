import React, {Component} from 'react'
import { Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {updateRole} from './AdminFunctions'


export default class UpdateRolePopUp extends Component{
    constructor(props){
        super(props);
        this.state= {
            role: "",
            teamid: this.props.teamid,
            status: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange=(e)=>{
        this.setState({ role : e.target.value })
    }

    onSubmit=async (e)=>{
        e.preventDefault()
        const user = {
            role: this.state.role,
            teamid: this.state.teamid
        };
        console.log("changing role");
        let changed =await updateRole(user);
        console.log(changed)
        if(changed) {
            console.log("role changed succesfully")
            this.setState({status: true})
        }
        
    }

    render(){
        return(
            <div>
                {this.state.status ?
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="role" style={{color:"green"}}>role changed successfully  !!!</label>
                        <br></br>
                        <input type="text" id="role" placeholder="role" name="role" style={{padding: "8px"}} value="" onChange={this.onChange} disabled={true}/>
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
                    <Modal.Title>Change Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="role">Choose New Role</label>
                        <br></br>
                        <select
                            className="form-control"
                            name="role"
                            value={this.state.role}
                            onChange={this.onChange}
                        >
                            <option>Admin</option>
                            <option>Accountant</option>
                            <option>Customer Service</option>
                        </select>
                        {/* <input type="text" id="role" placeholder="role" name="role" style={{padding: "8px"}} onChange={this.onChange} /> */}
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