import React, { Component } from 'react';
import { Navbar, Button, NavItem } from 'react-materialize';
import LoginButton from './LoginButton';

class TopNav extends Component {
    render() {
        return (
            <Navbar 
                // className='red accent-1' 
                brand='Visual Housing Price' 
                right
            >
                <NavItem href='#data'>Data</NavItem>
                <li><LoginButton {...this.props} /></li>
            </Navbar>
        );
    }
}

export default TopNav;
