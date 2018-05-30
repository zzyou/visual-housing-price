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
  // can I rewrite the state to { stateName: '', statePrice: 0 }?
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      level: 'State',
      year: '2017',
      stateName: ''
    }
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    const level = this.state.level;
    const stateName = this.state.stateName;

    if (stateName === '') {
      callApi(`/states/${level}`)
        .then(res => {
          const data = JSON.parse(JSON.stringify(res));
          const sortedData = data.sort((a, b) => (a.index_nsa - b.index_nsa));

          return this.setState({
            response: sortedData
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  componentDidMount() {
    this.getData();
  }

  handleChange(e) {
    this.setState({
      year: e.target.value
    });
  }

  // // will only update the state when the page is first loaded.
  // //  won't update the state when the page is being refresed.
  // // need to think an alternative way.
  // UNSAFE_componentWillMount() {
  //   callApi('/states/2017/CA')
  //   .then(res => {
  //     console.log(res);
  //     const data = JSON.parse(JSON.stringify(res));
  //     const sortedStateData = data.sort((a, b) => (a.index_nsa - b.index_nsa));

  //     return this.setState({
  //       response: sortedStateData
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  // UNSAFE_componentWillMount() {
  //   callApi('/states/2017')
  //   .then(res => {
  //     const data = JSON.parse(JSON.stringify(res));
  //     const sortedStateData = data.sort((a, b) => (a.index_nsa - b.index_nsa));

  //     return this.setState({
  //       response: sortedStateData
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  render() {
    return (
      <div>
        <TopNav />

        {/* <D3 data={this.state.response} /> */}

        <Chart data={this.state.response} year={this.state.year} />

        <Row>
            <Input 
              value={this.state.year} 
              onChange={this.handleChange} 
              s={12} type='select' label="Year"
            >
                <option value='2017'>2017</option>
                <option value='2000'>2000</option>
                <option value='1975'>1975</option>
            </Input>
        </Row>

        <BottomNav />
      </div>
    )
  }
};

export default App;
