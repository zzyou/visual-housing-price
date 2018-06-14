import React, { Component } from "react";
import { Button, SideNav, SideNavItem } from "react-materialize";
import Auth from "../Auth0/Auth/Auth";
import Profile from "./Profile";
import "./LoginButton.css";

const auth = new Auth();

class LoginButton extends Component {
  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  render() {
    const { isAuthenticated } = auth;

    return (
      <div>
        {!isAuthenticated() && (
          <Button onClick={this.login.bind(this)}>Log In</Button>
        )}
        {isAuthenticated() && (
          <SideNav
            trigger={<Button className="profile-button">Profile</Button>}
            options={{ closeOnClick: true }}
          >
            <Profile auth={auth} />
            <SideNavItem divider />
            <SideNavItem onClick={this.logout.bind(this)}>Log Out</SideNavItem>
          </SideNav>
        )}
      </div>
    );
  }
}

export default LoginButton;
