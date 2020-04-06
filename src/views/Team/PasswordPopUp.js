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
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange=(e)=>{
        this.setState({ password : e.target.value })
    }

    onSubmit=async (e)=>{
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("changing password");
        let changed =await updatePassword(user);
        console.log(changed)
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
                {this.state.status ?
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="password" style={{color:"green"}}>Password changed successfully  !!!</label>
                        <br></br>
                        <input type="password" id="password" placeholder="password" name="password" style={{padding: "8px"}} value="" onChange={this.onChange} disabled={true}/>
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
                    <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
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
                }
            </div>

        );
    }

}