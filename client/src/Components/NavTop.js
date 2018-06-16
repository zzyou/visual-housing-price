import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import LoginButton from "./LoginButton";
import history from "../Auth0/history";
import "./NavTop.css";

class NavTop extends Component {
  goTo(route) {
    history.replace(`/${route}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const renderChart = () => {
      return isAuthenticated() ? this.goTo("User") : this.goTo("Chart");
    };

    return (
      <Navbar brand="Viztory" right>
        <NavItem onClick={renderChart}>Visual House Price</NavItem>
        <NavItem href="#footer">Contact Info</NavItem>
        <li>
          <LoginButton />
        </li>
      </Navbar>
    );
  }
}

export default NavTop;
