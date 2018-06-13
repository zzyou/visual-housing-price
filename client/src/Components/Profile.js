import React, { Component } from "react";
import { SideNavItem } from "react-materialize";
import "./Profile.css";

class Profile extends Component {
  state = {
    profile: {}
  };

  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;

    return (
      <SideNavItem
        userView
        user={{
          background: profile.picture,
          image: profile.picture,
          name: profile.name,
          email: profile.email
        }}
      />
    );
  }
}

export default Profile;
