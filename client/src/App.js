import React, { Component } from 'react';
import './App.css';

// cannot use route '/data', seems to be a reserved word?
const callApi = async (route) => {
  const response = await fetch(route);
  const body = await response.json();
  return body;
}

class App extends Component {
  state = {
    response: ''
  }

  componentDidMount() {
    callApi('/states/2017')
    .then(res =>
      // console.log(res);
      this.setState({
        response: res.data[0].place_id
      })
    )
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return <div>{this.state.response}</div>;
  }
}

export default App;
