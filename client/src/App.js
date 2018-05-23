import React, { Component } from 'react';
import './App.css';
import D3Analysis from './d3.js';

// cannot use route '/data', seems to be a reserved word?
const callApi = async (route) => {
  const response = await fetch(route);
  const body = await response.json();
  return body;
};

class App extends Component {
  // state = {
  //   myname: '',
  //   myprice: ''
  // }
  state = {
    response: []
  }

  componentDidMount() {
    callApi('/states/2017')
    .then(res => {
      const data = JSON.parse(JSON.stringify(res));
      const sortedStateData = data.sort((a, b) => (a.index_nsa - b.index_nsa));
      // const statePrice = sortedStateData.map(obj => obj.index_nsa);
      // const stateName = sortedStateData.map(obj=> obj.place_id);
      
      // return this.setState({
      //   myprice: statePrice,
      //   myname: stateName
      // })
      return this.setState({
        response: sortedStateData
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    // return <div>{this.state.myname}</div>;
    // return <D3Analysis myname={this.state.myname} myprice={this.state.myprice} />;
    return <D3Analysis data={this.state.response} />
  }
};

export default App;
