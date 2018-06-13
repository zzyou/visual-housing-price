import React, { Component } from "react";
import { Col, ProgressBar } from "react-materialize";
import Chart from "./Chart";
import FetchDataWrapper from "./FetchDataWrapper";

class ChartRender extends Component {
  render() {
    return (
      <div>
        {this.props.error && <p>{this.props.error.message}</p>}

        {this.props.isLoading && (
          <Col s={12}>
            <ProgressBar />
          </Col>
        )}

        {this.props.data.length > 0 && <Chart data={this.props.data} />}
      </div>
    );
  }
}

export default FetchDataWrapper("/states/alldata")(ChartRender);
