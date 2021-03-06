import React, { Component } from "react";
import ChartRender from "../Components/ChartRender";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";

class Chart extends Component {
  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} />

        <ChartRender />

        <NavBottom />
      </div>
    );
  }
}

export default Chart;
