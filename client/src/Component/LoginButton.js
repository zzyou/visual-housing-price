import React, { Component } from 'react';
import { Button, Dropdown, NavItem } from 'react-materialize';
import Auth from '../Auth/Auth';
import history from '../history';

const auth = new Auth();

class LoginButton extends Component {
    goTo(route) {
        history.replace(`/${route}`)
    }

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
                            <Button>My Info</Button>
                        }>
                            <NavItem onClick={this.goTo.bind(this, 'profile')}>My Profile</NavItem>
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