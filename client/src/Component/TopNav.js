import React, { Component } from 'react';
import { Navbar } from 'react-materialize';
import LoginButton from './LoginButton';

class TopNav extends Component {
    render() {
        return (
            <Navbar 
                // className='red accent-1' 
                brand='Visual Housing Price' 
                right
            >
                <LoginButton />
            </Navbar>
        );
    }
}

export default TopNav;
