import React, { Component } from 'react';
import { Button } from 'react-materialize';

class Login extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <Button 
                    onClick={this.goTo.bind(this, 'home')}
                >
                    home
                </Button>

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
                    isAuthenticated && (
                        <Button
                            onClick={this.logout.bind(this)}
                        >
                            Log Out
                        </Button>
                    )
                }
            </div>
        );
    }
}

export default Login;