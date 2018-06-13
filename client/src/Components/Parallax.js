import React, { Component } from "react";
import { Parallax } from "react-materialize";
import background1 from "../images/architecture-autumn.jpg";
import background2 from "../images/bikes-buildings.jpg";

class HomeParallax extends Component {
  render() {
    return (
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
    );
  }
}

export default HomeParallax;
