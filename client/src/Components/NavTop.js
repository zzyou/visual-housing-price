import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import LoginButton from "./LoginButton";
import history from "../Auth0/history";

class TopNav extends Component {
  goTo(route) {
    history.replace(`/${route}`);
  }

  render() {
    return (
      <Navbar brand="Viztory" right>
        <NavItem onClick={() => this.goTo("Chart")}>Visual House Price</NavItem>
        <NavItem href="#footer">Contact Info</NavItem>
        <li>
          <LoginButton />
        </li>
      </Navbar>
    );
  }
}

export default TopNav;
