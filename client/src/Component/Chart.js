import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';

import Axes from './Axes';
import Bars from './Bars';
import ResponsiveWrapper from './ResponsiveWrapper';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.xScale = scaleBand();
        this.yScale = scaleLinear();
    }

    render() {
        const rawData = this.props.data;
        // d.yr is number, while this.props.year is string.
        const year = +this.props.year;

        const data = rawData.filter(d => d.yr === year);

        const data2017 = rawData.filter(d => d.yr === 2017);

        const margins = { top: 50, right: 20, bottom: 100, left: 60 };
        const svgDimensions = { 
            width: Math.max(this.props.parentWidth, 700), 
            height: 650 
        };
        const maxValue = Math.max(...data.map(d => d.index_nsa));
        const maxValue2017 = Math.max(...data2017.map(d => d.index_nsa));

        const xScale = this.xScale
            .padding(0.5)
            .domain(data2017.map(d => d.place_id))
            .range([margins.left, svgDimensions.width - margins.right]);
        
        const yScale = this.yScale
            .domain([0, maxValue2017])
            .range([svgDimensions.height - margins.bottom, margins.top]);
        
        return (
            <svg width={svgDimensions.width} height={svgDimensions.height}>
                <Axes
                    scales={{ xScale, yScale }}
                    margins={margins}
                    svgDimensions={svgDimensions}
                />

                <Bars
                    scales={{ xScale, yScale }}
                    margins={margins}
                    data={data}
                    maxValue={maxValue}
                    svgDimensions={svgDimensions}
                />
            </svg>
        );
    }
}

export default ResponsiveWrapper(Chart);
