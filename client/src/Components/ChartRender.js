import React, { Component } from "react";
import { Col, ProgressBar } from "react-materialize";
import ChartLogic from "./ChartLogic";
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

        {this.props.data.length > 0 && (
          <ChartLogic
            data={this.props.data}
            level={this.props.level}
            year={this.props.year}
            stateName={this.props.stateName}
          />
        )}
      </div>
    );
  }
}

export default FetchDataWrapper("/states/alldata")(ChartRender);
