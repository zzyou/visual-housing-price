import React, { Component } from "react";
import { Button, Input, Row } from "react-materialize";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import ChartRender from "../Components/ChartRender";
import SaveData from "../Components/SaveData";
import "./User.css";
import yearOptions from "../Components/yearOptions";
import stateOptions from "../Components/stateOptions";

class User extends Component {
  state = {
    level: "State",
    year: "",
    stateName: "",
    profile: {}
  };

  handleYearChange = e => {
    console.log("year", e.target.value);
    this.setState({
      year: e.target.value
    });

    if (this.state.profile.sub) {
      SaveData(
        "/save_user",
        this.state.profile.sub,
        e.target.value,
        this.state.stateName
      );
    }
  };

  handleStateChange = e => {
    console.log("state", e.target.value);
    if (e.target.value === "AllStates") {
      this.setState({
        level: "State",
        stateName: e.target.value
      });
    } else {
      this.setState({
        level: "MSA",
        stateName: e.target.value
      });
    }

    if (this.state.profile.sub) {
      SaveData(
        "/save_user",
        this.state.profile.sub,
        this.state.year,
        e.target.value
      );
    }
  };

  componentDidMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  render() {
    return (
      <div>
        <NavTop auth={this.props.auth} />

        <Row className="user-input">
          <Input
            onChange={this.handleYearChange}
            type="select"
            label="Your Preference of Year"
            defaultValue="2017"
          >
            {yearOptions()}
          </Input>

          <Input
            onChange={this.handleStateChange}
            type="select"
            label="Your Preference of State"
            defaultValue="AllStates"
          >
            <option value="AllStates">All States</option>
            {stateOptions()}
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
