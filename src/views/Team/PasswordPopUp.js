import React, {Component} from 'react'
import { Modal, Button, Row, Col, Form} from 'react-bootstrap'
import {updatePassword} from './UserFunctions'


export default class PasswordPopUp extends Component{
    constructor(props){
        super(props);
        this.state= {
            password: '',
            email: this.props.email,
            status: false
        }
    }

    onChange=(e)=>{
        this.setState({ [e.target.password] : e.target.value })
    }

    onSubmit=async (e)=>{
        e.preventDefault()
        let changed = await updatePassword({
            email: this.state.email,
            password: this.state.password,
        })
        if(changed) {
            this.setState({status: true})
        }
        
        // register(newUser).then(res => {
        //     this.props.history.push(`/profile`)
        // })
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
        {this.state.status && <p>Password Changed!</p>}
                    <Modal.Body>
                        <label htmlFor="password">Enter New Password</label>
                        <br></br>
                        <input type="password" id="password" placeholder="password" name="password" style={{padding: "8px"}} onChange={this.onChange} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Change Password
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

}