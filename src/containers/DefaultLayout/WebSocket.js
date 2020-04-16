import React from "react";
import Websocket from "react-websocket";
import { Link, NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Badge,
} from "reactstrap";
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      count: 0,
    };
  }

  componentDidMount = () => {
    console.log('"hasfh"');
    // fetchNotifications and initialize count
  };

  handleData = (data) => {
    let result = JSON.parse(data);
    // this.setState({ count: this.state.count + result.movement });
    console.log("HEY");
    console.log(result);
    const newData = this.state.data;
    newData.push(result);
    const newNotification = this.state.count + 1;
    this.setState({ data: newData, count: newNotification });
  };
  clearNotification = () => {
    this.setState({ count: 0 });
  };

  render() {
    console.log("HEYA");
    return (
      <React.Fragment>
        <Websocket
          url="ws://3.6.243.136:8000/customer/transaction/socket"
          onMessage={this.handleData}
        />
        <DropdownToggle nav onClick={this.clearNotification}>
          <NavLink to="#" className="nav-link">
            <i className="icon-bell"></i>
            {this.state.count != 0 && (
              <Badge pill color="danger">
                {this.state.count}
              </Badge>
            )}
          </NavLink>
        </DropdownToggle>

        {this.state.data.length !== 0 ? (
          <DropdownMenu right>
            {this.state.data.map((o) => {
              return (
                <DropdownItem>
                  <i className="fa fa-user"></i>
                  <Link
                    to={`/tables/transaction?merchantid=${o.Merchant_Transaction_Id}`}
                  >
                    <p>
                      <b>{o.customer_souls_id}</b>
                    </p>
                    <p>{o.Customer_Name}</p>
                    <p>{o.Merchant_Transaction_Id}</p>
                  </Link>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownItem>No Recent Transactions</DropdownItem>
          </DropdownMenu>
        )}
      </React.Fragment>
    );
  }
}

export default ProductDetail;
