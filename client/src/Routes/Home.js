import React, { Component } from "react";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import Parallax from "../Components/Parallax";

class Home extends Component {
  render() {
    return (
      <div>
        <NavTop />

        <Parallax />

        <NavBottom />
      </div>
    );
  }
}

export default Home;
