import React, { Component } from 'react';
import { Button, Card, Dropdown, Footer, Navbar, NavItem, Icon, Pagination, ProgressBar, Row, Col } from 'react-materialize';
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

  UNSAFE_componentWillMount() {
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
    return (
      <div>
        <Navbar brand='logo' right>
          <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
          <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
          <Dropdown trigger={
              <Button>Drop me!</Button>
            }>
            <NavItem>one</NavItem>
            <NavItem>two</NavItem>
            <NavItem divider />
            <NavItem>three</NavItem>
          </Dropdown>
        </Navbar>
        <Button>Housing Price</Button>
        <Col m={6} s={12}>
            <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' actions={[<a href='#'>This is a link</a>]}>
            I am a very simple card.
            </Card>
        </Col>
        <D3Analysis data={this.state.response} />
        <Row>
          <Col s={12}>
            <ProgressBar progress={70}/>
          </Col>
          <Col s={12}>
            <ProgressBar />
          </Col>
        </Row>
        <Pagination items={10} activePage={2} maxButtons={8} />
        <Footer copyrights="&copy 2015 Copyright Text" 
          moreLinks={
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          }
          links={
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          }
          className='example'
        >
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </Footer>;
      </div>
    )
  }
};

export default App;
