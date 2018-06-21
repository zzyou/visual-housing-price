import React, { Component } from "react";
import "./User.css";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartUserRender from "../Components/ChartUserRender";

class User extends Component {
  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} />

        <ChartUserRender auth={this.props.auth} />

        <NavBottom />
      </div>
    );
  }
}

export default User;
