import React, {Component} from 'react'
import { Modal, Button, Row, Col, Form} from 'react-bootstrap'

export class PasswordPopUp extends Component{
    constructor(pops){
        super(props);
    }
    render(){
        return(
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Password
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

}