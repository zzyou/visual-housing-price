import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import LoginButton from "./LoginButton";

class TopNav extends Component {
  render() {
    return (
      <Navbar
        // className='red accent-1'
        brand="Viztory"
        right
      >
        <NavItem href="#data">Data</NavItem>
        <li>
          <LoginButton />
        </li>
      </Navbar>
    );
  }
}

export default TopNav;
