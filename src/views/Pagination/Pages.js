import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// import 'bootstrap-less'
// import "bootstrap-less";
// require("bootstrap/less/bootstrap.less");
 
class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
 
  render() {
    return (
      <div>
        <Pagination className="pagination"
          hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}             // check 
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}
 
export default Pages;
 