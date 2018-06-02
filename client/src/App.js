import React, { Component } from 'react';
import { Input, Row } from 'react-materialize';

// import D3 from './d3';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import './App.css';

// cannot use route '/data', seems to be a reserved word?
const callApi = async (route) => {
  const response = await fetch(route);
  const body = await response.json();
  return body;
};

class App extends Component {
  // rethink this.state
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      year: '2017',
      // stateData: [],
      // cityData: [],
      // level: 'State',
      // stateName: ''
    };

    this.getData = this.getData.bind(this);
    // this.getStateData = this.getStateData.bind(this);
    // this.getCityData = this.getCityData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // getStateData() {
  //   const level = this.state.level;
  //   const stateName = this.state.stateName;

  //   if (level === 'State' && stateName === '') {
  //     callApi(`/states/${level}`)
  //       .then(res => {
  //         const data = JSON.parse(JSON.stringify(res));
  //         return this.setState({
  //           stateData: data
  //         })
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  // }

  // getCityData() {
  //   const level = this.state.level;
  //   const stateName = this.state.stateName;

  //   if (level === 'MSA' && stateName) {
  //     callApi(`/states/${level}/${stateName}`)
  //       .then(res => {
  //         const data = JSON.parse(JSON.stringify(res));
  //         return this.setState({
  //           cityData: data
  //         })
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  // }

  handleChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  getData() {
    callApi('/states/alldata')
      .then(res => {
        const data = JSON.parse(JSON.stringify(res));
        return this.setState({
          data: data
        })
      })
      .catch(err => {
        console.log(err);
      })
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

        <Chart data={this.state.data} year={this.state.year} />

        <BottomNav />
      </div>
    )
  }
};

export default App;
