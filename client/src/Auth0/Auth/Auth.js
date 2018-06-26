import history from "../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
// require("dotenv").config({ path: "../../../../.env" });

// when deploying, remove AUTH_CONFIG and dotenv

let auth0Config;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  auth0Config = {
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid profile email"
  };
} else {
  auth0Config = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
    responseType: "token id_token",
    scope: "openid profile email"
  };
}

export default class Auth {
  auth0 = new auth0.WebAuth(auth0Config);

  userProfile;

  constructor() {
    // this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  // signup() {
  //     this.auth0.signup({
  //         connection: 'CONNECTION',
  //         email: 'EMAIL',
  //         password: 'PASSWORD'
  //     }, (err) => {
  //         if (err) return alert('Something went wrong: ' + err.message);
  //         return alert('Success signup!')
  //     });
  // }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
        // this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
        //     console.log(user.sub);
        // });
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    history.replace("/user");
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    history.replace("/chart");
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
