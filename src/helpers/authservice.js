import auth0 from "auth0-js";
import { EventEmitter } from "events";
import authConfig from "../../auth_config.json";
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'social_access_token';
const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/authcallback`,
  clientID: authConfig.clientId,
  responseType: "id_token",
  scope: "openid profile email",
  audience:"https://drugwars-api-straging.herokuapp.com"
});

function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
const localStorageKey = "loggedIn";
const loginEvent = "loginEvent";
class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;

  login(customState) {
    webAuth.authorize({
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/authcallback`,
      audience: "https://drugwars-api-straging.herokuapp.com",
      scope: "openid profile email",
    });
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  setAccessToken() {
    let accessToken = getParameterByName('access_token');
    let authType = 'social';
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem('auth', authType);
  }

  setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }

  logOut() {
    localStorage.removeItem(localStorageKey);

    this.idToken = null;
    this.tokenExpiry = null;
    this.profile = null;

    webAuth.logout({
      returnTo: `${window.location.origin}`
    });

    this.emit(loginEvent, { loggedIn: false });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          this.emit(loginEvent, {
            loggedIn: false,
            error: err,
            errorMsg: err.statusText
          });
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }

  isAuthenticated() {
    return (
      Date.now() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === "true"
    );
  }

  isIdTokenValid() {
    return this.idToken && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken);
      } else if (this.isAuthenticated()) {
        this.renewTokens().then(authResult => {
          resolve(authResult.idToken);
        }, reject);
      } else {
        resolve();
      }
    });
  }

  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    localStorage.setItem(localStorageKey, "true");
    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    });
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== "true") {
        return reject("Not logged in");
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult);
        }
      });
    });
  }
}

const service = new AuthService();

service.setMaxListeners(5);

export default service;