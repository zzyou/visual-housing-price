import React, { Component } from 'react';
import './App.css';

const callApi = async () => {
  // cannot use route '/data', seems to be a reserved word?
  const response = await fetch ('/hello');
  const body = await response.json();
  console.log(body);
  return body;
}

class App extends Component {
  state = {
    response: ''
  }

  componentDidMount() {
    callApi()
    .then(res => {
      console.log(res);
      this.setState({
        response: res.express
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    console.log(this.state);
    return <div>{this.state.response}</div>;
  }
}

export default App;
