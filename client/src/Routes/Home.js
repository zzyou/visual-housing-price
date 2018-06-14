import React, { Component } from "react";
import "./Home.css";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import Parallax from "../Components/Parallax";

class Home extends Component {
  render() {
    return (
      <div>
        <NavTop />

        <Parallax />

        {/* todo: add a button to animate the Chart, change this.state.year automatically */}

        <NavBottom />
      </div>
    );
  }
}

export default Home;
