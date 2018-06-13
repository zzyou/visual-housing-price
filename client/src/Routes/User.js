import React, { Component } from "react";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartRender from "./ChartRender";

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

        <ChartRender />

        <NavBottom />
      </div>
    );
  }
}

export default User;
