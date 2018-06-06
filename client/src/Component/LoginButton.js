import React, { Component } from 'react';
import { Button, Dropdown, NavItem } from 'react-materialize';
import Auth from '../Auth/Auth';

const auth = new Auth();

class LoginButton extends Component {
    // goTo(route) {
    //     this.props.history.replace(`/${route}`)
    // }

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }

    render() {
        const { isAuthenticated } = auth;

        return (
            <div>
                {/* <Button 
                    onClick={this.goTo.bind(this, 'home')}
                >
                    home
                </Button> */}

                {/* how to load data again after logged in */}
                {
                    !isAuthenticated() && (
                        <Button
                            onClick={this.login.bind(this)}
                        >
                            Log In
                        </Button>
                    )
                }
                {
                    isAuthenticated() && (
                        <Dropdown trigger={
                            <Button>My Profile</Button>
                        }>
                            <NavItem>My Location</NavItem>
                            <NavItem divider />
                            <NavItem onClick={this.logout.bind(this)}>
                                Log Out
                            </NavItem>
                        </Dropdown>
                    )
                }
            </div>
        );
    }
}

export default LoginButton;