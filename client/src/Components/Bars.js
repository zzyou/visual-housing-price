import React, { Component } from "react";
import { selectAll as d3SelectAll } from "d3-selection";
import "d3-transition";
// import { scaleLinear } from 'd3-scale';
// import { interpolateLab } from 'd3-interpolate';

const colorGenerator = d => {
  if (d < 200) {
    return "#00B628";
  } else if (d < 300) {
    return "#A6E885";
  } else if (d < 400) {
    return "#FEAED8";
  } else if (d >= 400) {
    return "#E60086";
  }
};

class Bars extends Component {
  onMouseOver = e => {
    e.target.style.opacity = "0.5";
  };

  onMouseLeave = e => {
    e.target.style.opacity = "1";
  };

  componentDidMount() {
    d3SelectAll("rect")
      .transition()
      .delay((d, i) => i * 100)
      .duration(15)
      .style("opacity", "0.1")
      .transition()
      .style("opacity", "0.2")
      .transition()
      .style("opacity", "0.3")
      .transition()
      .style("opacity", "0.4")
      .transition()
      .style("opacity", "0.5")
      .transition()
      .style("opacity", "0.6")
      .transition()
      .style("opacity", "0.7")
      .transition()
      .style("opacity", "0.8")
      .transition()
      .style("opacity", "0.9")
      .transition()
      .style("opacity", "1");
  }

  componentDidUpdate() {
    d3SelectAll("rect")
      .transition()
      .style("opacity", "0.8")
      .transition()
      .style("opacity", "0.9")
      .transition()
      .style("opacity", "1");
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props;
    const { xScale, yScale } = scales;
    const { height } = svgDimensions;

    const bars = data.map(datum => (
      <rect
        style={{ cursor: "pointer" }}
        onClick={() => this.props.onClick(datum.place_id, datum.place_name)}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        key={datum.place_name}
        x={xScale(datum.place_name)}
        y={yScale(datum.index_nsa)}
        height={height - margins.bottom - scales.yScale(datum.index_nsa)}
        width={xScale.bandwidth()}
        fill={colorGenerator(datum.index_nsa)}
        opacity={0}
      />
    ));

    return <g>{bars}</g>;
  }
}

export default Bars;
