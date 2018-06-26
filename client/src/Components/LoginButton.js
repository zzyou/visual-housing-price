import React, { Component } from "react";
import { Button, SideNav, SideNavItem } from "react-materialize";
import Auth from "../Auth0/Auth/Auth";
import Profile from "./Profile";
import "./LoginButton.css";

const auth = new Auth();

class LoginButton extends Component {
  state = {
    profile: {},
    preference: []
  };

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  handleClick = () => {
    const { isAuthenticated, userProfile, getProfile } = auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });

          fetch(`/user/${profile.email}`)
            .then(res => res.json())
            .then(data => {
              this.setState({
                preference: data
              });
            })
            .catch(err => console.error(err.toString()));
        });
      } else {
        this.setState({ profile: userProfile });

        fetch(`/user/${userProfile.email}`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              preference: data
            });
          })
          .catch(err => console.error(err.toString()));
      }
    }
  };

  render() {
    const { isAuthenticated } = auth;
    const preference =
      this.state.preference.length === 0
        ? this.props.preference
        : this.state.preference;

    return (
      <div>
        {!isAuthenticated() && (
          <Button onClick={this.login.bind(this)}>Log In</Button>
        )}
        {isAuthenticated() && (
          <SideNav
            trigger={<Button className="profile-button">Profile</Button>}
            options={{ closeOnClick: false }}
          >
            <Profile auth={auth} />
            {preference !== undefined &&
              preference[0] !== undefined && (
                <SideNavItem>
                  Preference of year: {preference[0].year}
                </SideNavItem>
              )}
            {preference !== undefined &&
              preference[0] !== undefined && (
                <SideNavItem>
                  Preference of state: {preference[0].state}
                </SideNavItem>
              )}
            <SideNavItem onClick={this.handleClick}>
              <Button>Refresh</Button>
            </SideNavItem>
            <SideNavItem divider />
            <SideNavItem onClick={this.logout.bind(this)}>Log Out</SideNavItem>
          </SideNav>
        )}
      </div>
    );
  }
}

export default LoginButton;
