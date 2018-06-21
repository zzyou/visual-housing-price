import React, { Component } from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { Button, Input, Row } from "react-materialize";
import "./ChartUser.css";
import Axes from "./Axes";
import Bars from "./Bars";
import ResponsiveWrapper from "./ResponsiveWrapper";
import SaveData from "./SaveData";
import yearOptions from "./yearOptions";
import stateOptions from "./stateOptions";

class ChartUser extends Component {
  constructor(props) {
    super(props);

    this.xScale = scaleBand();
    this.yScale = scaleLinear();

    this.state = {
      level: "State",
      year: "2017",
      stateName: "",
      longStateName: "",
      save: false
    };
  }

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
    if (this.props.email) {
      this.setState({
        save: true
      });
      SaveData(
        "/save_user",
        this.props.name,
        this.props.email,
        +this.state.year,
        this.state.stateName
      );
    }
  };

  handleBarClick = (shortName, longName) => {
    const level = this.state.level;
    this.setState({
      level: level === "State" ? "MSA" : "State",
      stateName: shortName,
      longStateName: longName
    });
  };

  render() {
    const rawData = this.props.data;
    const year = +this.state.year;
    const level = this.state.level;
    const stateName = this.state.stateName;
    let data;
    let data2017;

    if (level === "State") {
      const stateData = rawData.filter(d => d.level === "State");
      data = stateData.filter(d => d.yr === year);
      data2017 = stateData.filter(d => d.yr === 2017);
    } else if (level === "MSA") {
      const cityData = rawData.filter(
        d =>
          d.level === "MSA" &&
          (d.place_name.includes(`, ${stateName}`) ||
            d.place_name.includes(`-${stateName}`))
      );
      data = cityData.filter(d => d.yr === year);
      data2017 = cityData.filter(d => d.yr === 2017);
    }

    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 700),
      height: 650
    };
    const maxValue = Math.max(...data.map(d => d.index_nsa));
    const maxValue2017 = Math.max(...data2017.map(d => d.index_nsa));

    const xScale = this.xScale
      .padding(0.5)
      .domain(data2017.map(d => d.place_name))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue2017])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <div>
        {this.state.level === "State" ? (
          <h5>
            <i>
              House Price Index by <b>States</b> in the U.S.,{" "}
              <b>{this.state.year}</b>
            </i>
          </h5>
        ) : (
          <h5>
            <i>
              House Price Index by Cities in <b>{this.state.longStateName}</b>,{" "}
              <b>{this.state.year}</b>
            </i>
          </h5>
        )}

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

        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
          />

          <Bars
            onClick={this.handleBarClick}
            scales={{ xScale, yScale }}
            margins={margins}
            data={data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        </svg>
      </div>
    );
  }
}

export default ResponsiveWrapper(ChartUser);
