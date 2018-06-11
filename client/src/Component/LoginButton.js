import React, { Component } from 'react';
import { Button, SideNav, SideNavItem } from 'react-materialize';
import Auth from '../Auth/Auth';
import history from '../history';
import Profile from '../Profile/Profile';

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
                        <SideNav 
                            trigger={ <Button className='profile-button'>Profile</Button> }
                            options={{ closeOnClick: true }} >
                            <Profile auth={auth}/>
                            <SideNavItem divider />
                            <SideNavItem onClick={this.logout.bind(this)}>
                                Log Out
                            </SideNavItem>
                        </SideNav>
                    )
                }
            </div>
        );
    }
}

export default LoginButton;