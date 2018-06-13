import React, { Component } from "react";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartRender from "./ChartRender";

class User extends Component {
  render() {
    return (
      <div>
        <NavTop />

        <ChartRender />

        <NavBottom />
      </div>
    );
  }
}

export default User;
