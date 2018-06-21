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
    level: "",
    year: "",
    stateName: "",
    profile: {},
    save: false
  };

  handleYearChange = e => {
    this.setState({
      year: e.target.value
    });
  };

  handleStateChange = e => {
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
  };

  handleSubmit = () => {
    if (this.state.profile.email) {
      this.setState({
        save: true
      });
      SaveData(
        "/save_user",
        this.state.profile.name,
        this.state.profile.email,
        +this.state.year,
        this.state.stateName
      );
    }
  };

  componentDidMount() {
    const { isAuthenticated, userProfile, getProfile } = this.props.auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
          console.log(profile);
        });
      } else {
        this.setState({ profile: userProfile });
        console.log(userProfile);
      }
    }
  }

  render() {
    return (
      <div>
        <NavTop
          auth={this.props.auth}
          year={this.state.year}
          stateName={this.state.stateName}
        />

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

          <Button
            onClick={this.handleSubmit}
            className="save-button"
            type="submit"
          >
            Save
          </Button>
        </Row>

        <ChartRender
          level={this.state.level}
          year={this.state.year}
          stateName={this.state.stateName}
        />

        <NavBottom />
      </div>
    );
  }
}

export default User;
