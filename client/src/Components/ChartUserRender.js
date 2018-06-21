import React, { Component } from "react";
import { Col, ProgressBar } from "react-materialize";
import ChartUser from "./ChartUser";
import FetchDataWrapper from "./FetchDataWrapper";

class ChartUserRender extends Component {
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
          <ChartUser
            data={this.props.data}
            name={this.props.name}
            email={this.props.email}
            preference={this.props.preference}
          />
        )}
      </div>
    );
  }
}

export default FetchDataWrapper("/states/alldata")(ChartUserRender);
