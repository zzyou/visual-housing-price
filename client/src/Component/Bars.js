import React, { Component } from 'react';
import { selectAll as d3SelectAll } from 'd3-selection';
import { transition } from 'd3-transition';
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

    onMouseOver = (e) => {
        e.target.style.opacity = '0.5';
    }

    onMouseLeave = (e) => {
        e.target.style.opacity = '1';
    }

    componentDidMount() {
        d3SelectAll('rect')
            .transition()
            .delay((d, i) => i * 100)
            .duration(15)
            .style('opacity', '0.1')
            .transition()
            .style('opacity', '0.2')
            .transition()
            .style('opacity', '0.3')
            .transition()
            .style('opacity', '0.4')
            .transition()
            .style('opacity', '0.5')
            .transition()
            .style('opacity', '0.6')
            .transition()
            .style('opacity', '0.7')
            .transition()
            .style('opacity', '0.8')
            .transition()
            .style('opacity', '0.9')
            .transition()
            .style('opacity', '1');
    }

    componentDidUpdate() {
        d3SelectAll('rect')
            .transition()
            .style('opacity', '0.8')
            .transition()
            .style('opacity', '0.9')
            .transition()
            .style('opacity', '1');
    }

    render(){
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        const bars = (
            data.map(datum => (
                <rect
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.props.onClick(datum.place_id)}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    key={datum.place_name}
                    x={xScale(datum.place_name)}
                    y={yScale(datum.index_nsa)}
                    height={height - margins.bottom - scales.yScale(datum.index_nsa)}
                    width={xScale.bandwidth()}
                    fill={colorGenerator(datum.index_nsa)}
                    opacity={0}
                    // fill={this.colorGenerator(datum.index_nsa)}
                    // fill={this.colorScale()(datum.index_nsa)}
                />
            ))
        );

        return (
            <g 
                // onMouseOver={this.handleHover}
            >
                {bars}
            </g>
        );
    }

}

export default Bars;
