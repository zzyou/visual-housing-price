import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Button, Input, Row } from 'react-materialize';

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

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleBackClick(e) {
        this.setState({
            level: 'State'
        })
    }

    // handleLevelChange(e) {
    //     const currentLocation = e.target.value;
    //     if (currentLocation === 'All States' && this.state.level === 'MSA') {
    //         this.setState({
    //             level: 'State'
    //         });
    //     }
    //     else if (currentLocation !== 'All States' && this.state.level === 'MSA' && currentLocation !== this.state.longStateName) {
    //         this.setState({

    //         })
    //     }
    // }

    handleYearChange(e) {
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
            const cityData = rawData.filter(d => d.level === 'MSA' 
                && ( d.place_name.includes(`, ${stateName}`)
                || d.place_name.includes(`-${stateName}`) ) );
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

        // const statesArr = [
        //     "AL: Alabama",
        //     "AK: Alaska",
        //     "AZ: Arizona",
        //     "AR: Arkansas",
        //     "CA: California",
        //     "CO: Colorado",
        //     "CT: Connecticut",
        //     "DE: Delaware",
        //     "DC: District of Columbia",
        //     "FL: Florida",
        //     "GA: Georgia",
        //     "HI: Hawaii",
        //     "ID: Idaho",
        //     "IL: Illinois",
        //     "IN: Indiana",
        //     "IA: Iowa",
        //     "KS: Kansas",
        //     "KS: Kentucky",
        //     "LA: Louisiana",
        //     "ME: Maine",
        //     "MD: Maryland",
        //     "MA: Massachusetts",
        //     "MI: Michigan",
        //     "MN: Minnesota",
        //     "MS: Mississippi",
        //     "MO: Missouri",
        //     "MT: Montana",
        //     "NV: Nebraska",
        //     "NV: Nevada",
        //     "NH: New Hampshire",
        //     "NJ: New Jersey",
        //     "NM: New Mexico",
        //     "NY: New York",
        //     "NC: North Carolina",
        //     "ND: North Dakota",
        //     "OH: Ohio",
        //     "OK: Oklahoma",
        //     "OR: Oregon",
        //     "PA: Pennsylvania",
        //     "RI: Rhode Island",
        //     "SC: South Carolina",
        //     "SD: South Dakota",
        //     "TN: Tennessee",
        //     "TX: Texas",
        //     "UT: Utah",
        //     "VT: Vermont",
        //     "VA: Virginia",
        //     "WA: Washington",
        //     "WV: West Virginia",
        //     "WI: Wisconsin",
        //     "WY: Wyoming" ];

        // const levelOptionsArr = () => (
        //     statesArr.map(state => (
        //         <option value={state.slice()} key={state}>{state}</option>
        //     ))
        // );
        
        // const levelInput = () => (
        //     <Row>
        //         <Input
        //             onChange={this.handleLevelChange}
        //             defaultValue='All States'
        //             s={4} type='select' label='Level'>
        //             <option value='All States' key='All States'>All States</option>
        //             {levelOptionsArr}
        //         </Input>
        //     </Row>
        // );
        
        const yearInput = () => (
            <Row className='year-range'>
                <Input 
                    onChange={this.handleYearChange} 
                    defaultValue={this.state.year}
                    s={12} type='range' label='Year' min='1975' max='2017'>
                </Input>
            </Row>
        );
        
        return (
            <div>
                { this.state.level === 'MSA' 
                    && (<Button onClick={this.handleBackClick}>Back to State Level</Button>) }                

                { this.state.level === 'State' ? 
                    (<h5><i>House Price Index by <b>States</b> in the U.S., <b>{this.state.year}</b></i></h5>) :
                    (<h5><i>House Price Index by Cities in <b>{this.state.longStateName}</b>, <b>{this.state.year}</b></i></h5>)  }
                
                {yearInput()}

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
