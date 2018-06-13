import React, { Component } from "react";
import { Col, ProgressBar } from "react-materialize";
import Chart from "./Chart";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import FetchDataWrapper from "./FetchDataWrapper";

class User extends Component {
  // login() {
  //     this.props.auth.login();
  // }

  render() {
    // const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <NavTop />

        {/* {
                    isAuthenticated() && (
                        <h6>
                            Welcome!
                        </h6>
                    )
                }
                {
                    !isAuthenticated() && (
                        <h6>
                            You can also{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.login.bind(this)}
                            >
                                log in
                            </a>
                            {' '}to continue.
                        </h6>
                    )
                } */}

        {this.props.error && <p>{this.props.error.message}</p>}

        {this.props.isLoading && (
          <Col s={12}>
            <ProgressBar />
          </Col>
        )}

        {this.props.data.length > 0 && <Chart data={this.props.data} />}

        <NavBottom />
      </div>
    );
  }
}

export default FetchDataWrapper("/states/alldata")(User);
