import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import ChartRender from "./Routes/ChartRender";
import User from "./Routes/User";
import Callback from "./Auth0/Callback/Callback";
import Auth from "./Auth0/Auth/Auth";
import history from "./Auth0/history";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route
            exact
            path="/chart"
            render={props => <ChartRender {...props} />}
          />
          <Route
            exact
            path="/user"
            render={props => <User auth={auth} {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
