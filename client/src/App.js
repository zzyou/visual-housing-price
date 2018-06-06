import React, { Component } from 'react';
import { Col, Input, ProgressBar, Row } from 'react-materialize';

// import D3 from './d3';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      year: '2017',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  getData() {
    this.setState({
      isLoading: true
    });
    fetch('/states/alldata')
      .then(res => res.json())
      .then(res => {
        const data = JSON.parse(JSON.stringify(res));
        return this.setState({
          data: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err.toString());
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {   
    // let optionsArr = [];
    // for (let yr = 2017; yr >= 1975; yr--) {
    //   optionsArr.push(<option value={yr} key={yr}>{yr}</option>);
    // }
    
    // maybe put rangeInput in Chart.js? 
    // so I can change min and max according to the actural data range.
    // city data in certain year is missing, now it shows blank in chart. 
    const rangeInput = () => (
      <Row>
          <Input 
            defaultValue={this.state.year} 
            onChange={this.handleChange} 
            s={12} type='range' label='Year 1975 - 2017' min='1975' max='2017'>
            {/* {optionsArr} */}
          </Input>
      </Row>
    );

    return (
      <div>
        <TopNav />

        {rangeInput()}

        {/* todo: add a button to animate the Chart, change this.state.year automatically */}

        {/* <D3 data={this.state.stateData} /> */}

        { this.state.isLoading ? 
          (<Col s={12}><ProgressBar /></Col>) :
          (<Chart data={this.state.data} year={this.state.year} />)
        }

        <BottomNav />
      </div>
    )
  }
};

export default App;
