import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Input, Row } from 'react-materialize';

import Axes from './Axes';
import Bars from './Bars';
// import Text from './Text';
import ResponsiveWrapper from './ResponsiveWrapper';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.xScale = scaleBand();
        this.yScale = scaleLinear();

        // Or, just get min yr and max yr when manipulating the data in render().
        // then pass the min yr and max yr to rangeInput.

        this.state = {
            year: '2017',
            level: 'State',
            stateName: '',
            longStateName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
          year: e.target.value
        });
    }

    handleClick(shortName, longName ) {
        const level = this.state.level;
        this.setState({
            level: level === 'State' ? 'MSA' : 'State',
            stateName: shortName,
            longStateName: longName
        });
    }

    render() {
        // Once this.state.level changes, this.state.year should be set to 2017 again.
        // in order to avoid missing city data in certain year.

        const rangeInput = () => (
            <Row className='year-range'>
                <Input
                  defaultValue={this.state.year} 
                  onChange={this.handleChange} 
                  s={12} type='range' label='' min='1975' max='2017'>
                </Input>
            </Row>
        );

        const rawData = this.props.data;
        // d.yr is number, while this.state.year is string.
        const year = +this.state.year;
        const level = this.state.level;
        const stateName = this.state.stateName;
        let data;
        let data2017;

        if (level === 'State') {
            const stateData = rawData.filter(d => d.level === 'State');    
            data = stateData.filter(d => d.yr === year);
            data2017 = stateData.filter(d => d.yr === 2017);
        }
        else if (level === 'MSA') {
            const cityData = rawData.filter(d => d.level === 'MSA' && d.place_name.includes(`, ${stateName}`));
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
                { this.state.level === 'State' ? 
                    (<h5><i>States in the U.S., {this.state.year}</i></h5>) :
                    (<h5><i>Cities in {this.state.longStateName}, {this.state.year}</i></h5>)  }
                
                {rangeInput()}

                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />

                    <Bars
                        onClick={this.handleClick}
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={data}
                        maxValue={maxValue}
                        svgDimensions={svgDimensions}
                    />

                    {/* <Text
                        scales={{ xScale, yScale }}
                        data={data}
                    /> */}
                </svg>
            </div>
        );
    }
}

export default ResponsiveWrapper(Chart);
