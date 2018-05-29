import React, { Component } from 'react';

// import D3 from './d3';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import ChartControl from './Component/ChartControl';
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
  state = {
    response: []
  }

  // will only update the state when the page is first loaded.
  // won't update the state when the page is being refresed.
  // need to think an alternative way.
  
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

  UNSAFE_componentWillMount() {
    callApi('/states/2017')
    .then(res => {
      const data = JSON.parse(JSON.stringify(res));
      const sortedStateData = data.sort((a, b) => (a.index_nsa - b.index_nsa));

      return this.setState({
        response: sortedStateData
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <TopNav />

        {/* <D3 data={this.state.response} /> */}

        <Chart data={this.state.response} />

        <ChartControl />

        <BottomNav />
      </div>
    )
  }
};

export default App;
