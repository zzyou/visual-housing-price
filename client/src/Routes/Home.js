import React, { Component } from "react";
import { Parallax } from "react-materialize";
import "./Home.css";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartRender from "./ChartRender";
import background1 from "../images/architecture-autumn.jpg";
import background2 from "../images/bikes-buildings.jpg";

class Home extends Component {
  render() {
    return (
      <div>
        <NavTop />

        <div>
          <Parallax imageSrc={background1} />
          <div className="section white parallax-section">
            <div className="row container">
              <h5 className="header">House Price Index</h5>
              <p className="grey-text text-darken-3 lighten-3">
                Data based on House Price Index (HPI): a weighted, repeat-sales
                index, measuring average price changes in repeat sales or
                refinancings on the same single-family houses in the United
                States.
              </p>
            </div>
          </div>
          <Parallax imageSrc={background1} />
          <div className="section white parallax-section">
            <div className="row container">
              <h5 className="header">House Price Index</h5>
              <p className="grey-text text-darken-3 lighten-3">
                Data based on House Price Index (HPI): a weighted, repeat-sales
                index, measuring average price changes in repeat sales or
                refinancings on the same single-family houses in the United
                States.
              </p>
            </div>
          </div>
          <Parallax imageSrc={background2} />
        </div>

        {/* todo: add a button to animate the Chart, change this.state.year automatically */}
        {/* <D3 data={this.state.stateData} /> */}

        <ChartRender />

        <NavBottom />
      </div>
    );
  }
}

export default Home;
