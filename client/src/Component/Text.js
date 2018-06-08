import React, { Component } from 'react';

// todo: show the accordinating text after clicking on or hover the bar

class Text extends Component {
    render() {
        const { scales, data } = this.props;
        const { xScale, yScale } = scales;

        const text = (
            data.map(datum => (
                <text
                    className='barText'
                    key={datum.place_name}
                    x={xScale(datum.place_name)}
                    y={yScale(datum.index_nsa)}
                    fill='grey'
                    textAnchor='start'
                    // opacity={0}
                >
                 {datum.index_nsa}
                </text>
            ))
        );

        return (
            <g>{text}</g>
        );
    }

}

export default Text;