import React, { Component } from "react";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import Parallax from "../Components/Parallax";

class Home extends Component {
  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} />

        <Parallax auth={this.props.auth} />

        <NavBottom />
      </div>
    );
  }
}

export default Home;
