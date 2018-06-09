import React, { Component } from 'react';
import { Col, ProgressBar } from 'react-materialize';

// import D3 from './d3';
import Chart from './Component/Chart';
import TopNav from './Component/TopNav';
import BottomNav from './Component/BottomNav';
import './App.css';
import FetchDataWrapper from './FetchDataWrapper';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav {...this.props} />

        {/* todo: add a button to animate the Chart, change this.state.year automatically */}
        {/* <D3 data={this.state.stateData} /> */}

        { this.props.error && (<p>{this.props.error.message}</p>) }
        
        { this.props.isLoading && (<Col s={12}><ProgressBar /></Col>) }  
        
        { this.props.data.length > 0 
          && (<Chart data={this.props.data} />) }

        <BottomNav />
      </div>
    )
  }
};

export default FetchDataWrapper('/states/alldata')(App);
