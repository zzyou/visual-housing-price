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
        <NavItem onClick={() => this.goTo("Chart")}>HPI Charts</NavItem>
        <NavItem href="#footer">Contact</NavItem>
        <li>
          <LoginButton />
        </li>
      </Navbar>
    );
  }
}

export default TopNav;
