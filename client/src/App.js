import React, { Component } from 'react';
import { Button, Card, Col, Dropdown, Footer, Input, Navbar, NavItem, Icon, Pagination, ProgressBar, Row, SideNav, SideNavItem } from 'react-materialize';
import './App.css';
import D3 from './d3';

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
        <SideNav
          trigger={<Button>SIDE NAV DEMO</Button>}
          options={{ closeOnClick: true }}
          >
          <SideNavItem userView
            user={{
              background: '#',
              image: '#',
              name: 'John Doe',
              email: 'jdandturk@gmail.com'
            }}
          />
          <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
          <SideNavItem href='#!second'>Second Link</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Subheader</SideNavItem>
          <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
        </SideNav>

        <Button>Housing Price</Button>

        <Col m={6} s={12}>
            <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' actions={[<a href='#' key='#'>This is a link</a>]}>
            I am a very simple card.
            </Card>
        </Col>
        <Row>
            <Input s={12} type='select' label="Materialize Select" defaultValue='2'>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </Input>
        </Row>
        <Row>
            <Input name='group1' type='checkbox' value='red' label='Red' />
            <Input name='group1' type='checkbox' value='yellow' label='Yellow' defaultValue='checked' />
            {/* <Input name='group1' type='checkbox' value='green' label='Green' className='filled-in' defaultChecked='checked' /> */}
            <Input name='group1' type='checkbox' value='brown' label='Brown' disabled='disabled' />
        </Row>
        <Row>
          <Input name='on' type='date' onChange={function(e, value) {}} />
        </Row>

        <D3 data={this.state.response} />

        <Row>
          <Col s={12}>
            <ProgressBar progress={70}/>
          </Col>
          <Col s={12}>
            <ProgressBar />
          </Col>
        </Row>
        <Pagination items={10} activePage={2} maxButtons={8} />
        <Footer copyrights="&copy; 2018 Copyright Text" 
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
        </Footer>
      </div>
    )
  }
};

export default App;
