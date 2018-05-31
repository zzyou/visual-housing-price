import React, { Component } from 'react';
// import { scaleLinear } from 'd3-scale';
// import { interpolateLab } from 'd3-interpolate';

const colorGenerator = (d) => {
    if (d < 200) {
        return "green";
    } else if (d < 300) {
        return "yellow";
    } else if (d < 400) {
        return "orange";
    } else if (d >= 400 ) {
        return "red";
    }
}

class Bars extends Component {
    // constructor(props) {
    //     super(props);

    //     // this.colorScale = this.colorScale.bind(this);
    //     this.colorGenerator = this.colorGenerator.bind(this);    
    // }

    // // colorScale() {
    // //     const maxValue = this.props.maxValue;
    // //     return scaleLinear()
    // //         .domain([0, maxValue])
    // //         .range(['#F3E5F5', '#7B1FA2'])
    // //         .interpolate(interpolateLab);
    // // }

    // colorGenerator(d) {
    //     if (d === this.props.maxValue) {
    //         return "#d73027";
    //     } else if (d >= 400) {
    //         return "#fc8d59";
    //     } else if (d >= 300) {
    //         return "#fee08b";
    //     } else if (d >= 200) {
    //         return "#d9ef8b";
    //     } else if (d < 200 ) {
    //         return "#91cf60";
    //     }
    // }

    render(){
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = (
            data.map(datum => 
                <rect
                    key={datum.place_id}
                    x={xScale(datum.place_id)}
                    y={yScale(datum.index_nsa)}
                    height={height - margins.bottom - scales.yScale(datum.index_nsa)}
                    width={xScale.bandwidth()}
                    fill={colorGenerator(datum.index_nsa)}
                    // fill={this.colorGenerator(datum.index_nsa)}
                    // fill={this.colorScale()(datum.index_nsa)}
                />,
            )
        );

        return (
            <g>{bars}</g>
        );
    }

}

export default Bars;
