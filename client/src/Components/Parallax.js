import React, { Component } from "react";
import { Button, Parallax } from "react-materialize";
import background1 from "../images/architecture-autumn.jpg";
import background2 from "../images/bikes-buildings.jpg";
import history from "../Auth0/history";
import "./Parallax.css";

class HomeParallax extends Component {
  goTo(route) {
    history.replace(`/${route}`);
  }

  render() {
    return (
      <div>
        <Parallax imageSrc={background1} />
        <div className="section white parallax-section teal lighten-2">
          <div className="row container center-align">
            <h5 className="header grey-text text-darken-3 lighten-3">
              Visualize House Price Change
            </h5>
            <p className="grey-text text-darken-3 lighten-3">
              From 1975 to 2017
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              What do you think how the house price has changed? Climb all the
              way high to the sky?
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Did California have the highest price change in 2017?
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              Which state had the highest price change in 1975?
            </p>
            <Button onClick={() => this.goTo("Chart")}>
              Data Visualization
            </Button>
          </div>
        </div>
        <Parallax imageSrc={background1} />
        <div className="section white parallax-section teal lighten-2">
          <div className="row container center-align">
            <h5 className="header grey-text text-darken-3 lighten-3">
              Data based on House Price Index
            </h5>
            <p className="grey-text text-darken-3 lighten-3">
              House Price Index (HPI) is a weighted, repeat-sales index,
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              measuring average price change in repeat sales or refinancings on
              the same single-family houses in the United States,
            </p>
            <p className="grey-text text-darken-3 lighten-3">
              reviewing repeat mortgage transactions on single-family properties
              whose mortgages have been purchased or securitized.
            </p>
            <Button onClick={() => this.goTo("Chart")}>
              Data Visualization
            </Button>
          </div>
        </div>
        <Parallax imageSrc={background2} />
      </div>
    );
  }
}

export default HomeParallax;
