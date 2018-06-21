import React, { Component } from "react";
import { Button, SideNav, SideNavItem } from "react-materialize";
import Auth from "../Auth0/Auth/Auth";
import Profile from "./Profile";
import "./LoginButton.css";

const auth = new Auth();

class LoginButton extends Component {
  state = {
    data: []
  };

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  componentDidMount() {
    const { isAuthenticated } = auth;
    // I still cannot access this.props.email here
    // but I can access this.props.email in the return function.
    const email = this.props.email;
    if (isAuthenticated()) {
      // why I cannot grab this.props.email and this.email here?
      fetch(`/user/${email}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: data
          });
        });
    }
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
            {/* <SideNavItem>Preference of name: {this.props.name}</SideNavItem>
            <SideNavItem>Preference of email: {this.props.email}</SideNavItem> */}
            <SideNavItem divider />
            <SideNavItem onClick={this.logout.bind(this)}>Log Out</SideNavItem>
          </SideNav>
        )}
      </div>
    );
  }
}

export default LoginButton;
