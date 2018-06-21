import React, { Component } from "react";
import "./User.css";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartUserRender from "../Components/ChartUserRender";

class User extends Component {
  state = {
    profile: {},
    preference: []
  };

  componentDidMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

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
  }

  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} preference={this.state.preference} />

        <ChartUserRender
          name={this.state.profile.name}
          email={this.state.profile.email}
          preference={this.state.preference}
        />

        <NavBottom />
      </div>
    );
  }
}

export default User;
