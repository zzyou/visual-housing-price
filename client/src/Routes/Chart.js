import React, { Component } from "react";
import ChartRender from "../Components/ChartRender";
import { Button } from "react-materialize";
import history from "../Auth0/history";

class Chart extends Component {
  goTo(route) {
    history.replace(`/${route}`);
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.goTo("")}>Back to Home</Button>
        <ChartRender />
      </div>
    );
  }
}

export default Chart;
