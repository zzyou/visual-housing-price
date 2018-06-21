import React, { Component } from "react";
import "./User.css";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartUserRender from "../Components/ChartUserRender";

class User extends Component {
  state = {
    profile: {}
  };

  componentDidMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} />

        <ChartUserRender
          name={this.state.profile.name}
          email={this.state.profile.email}
        />

        <NavBottom />
      </div>
    );
  }
}

export default User;
