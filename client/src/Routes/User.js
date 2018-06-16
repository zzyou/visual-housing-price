import React, { Component } from "react";
import { Button, Input, Row } from "react-materialize";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartRender from "../Components/ChartRender";
import SaveData from "../Components/SaveData";
import "./User.css";

class User extends Component {
  state = {
    level: "State",
    year: "2017",
    stateName: "",
    profile: {}
  };

  handleYearChange = e => {
    console.log("year", e.target.value);
    this.setState({
      year: e.target.value
    });
  };

  handleStateChange = e => {
    console.log("state", e.target.value);
    if (e.target.value === "AllStates") {
      this.setState({
        level: "State",
        stateName: ""
      });
    } else {
      this.setState({
        level: "MSA",
        stateName: e.target.value
      });
    }
  };

  componentDidMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

    if (isAuthenticated) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          SaveData("/save_user", profile);
        });
      } else {
        this.setState({ profile: userProfile });
        SaveData("/save_user", userProfile);
      }
    }
  }

  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} profile={this.state.profile} />

        <Row className="user-input">
          <Input
            onChange={this.handleYearChange}
            type="select"
            label="Your Preference of Year"
            defaultValue="2017"
          >
            <option value="2017">2017</option>
            <option value="2008">2008</option>
            <option value="1975">1975</option>
          </Input>
          <Input
            onChange={this.handleStateChange}
            type="select"
            label="Your Preference of State"
            defaultValue="CA"
          >
            <option value="AllStates">All States</option>
            <option value="NY">New York</option>
            <option value="WA">Washington</option>
          </Input>
          <Button className="save-button" type="submit">
            Save
          </Button>
        </Row>

        <ChartRender />

        <NavBottom />
      </div>
    );
  }
}

export default User;
