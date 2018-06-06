import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import User from './User';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' render={(props) => <App {...props} /> } />
                    <Route exact path='/user' render={(props) => <User auth={auth} {...props} />} />
                    <Route exact path='/callback' render={(props) => {
                        handleAuthentication(props);
                        return <Callback {...props} />
                    }}/>
                </Switch>
            </Router>
        );
    }
};

export default Routes;
