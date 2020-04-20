import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
class Loader extends Component {
    state = {  timer: null }
    componentDidMount() {
        this.state.timer = setTimeout(() => console.log('Hello, World!'), 3000)
      }
      
      componentWillUnmount() {
        clearTimeout(this.state.timer);
      }

    render() {
        return (
            <div class="d-flex justify-content-md-center align-items-center vh-100">
                {<ReactBootstrap.Spinner animation="border" variant="primary" /> }
                <h3 style={{padding: "10px"}}>Loading...</h3>
            </div>
        );
    }
}

export default Loader;