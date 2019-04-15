import Vue from 'vue';
import Promise from 'bluebird';
import client from '@/helpers/client';
import store from '@/store';
import sc from '@/helpers/steemconnect';
import CryptoJS from 'crypto-js';

// import * as util from 'util';
// import { inspect } from 'util';
const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;
const defaultErrorMessage = 'Oops something went wrong';

const handleError = (dispatch, error, message = defaultErrorMessage) => {
  dispatch('notify', {
    type: 'error',
    message: error.error_description || error.error || message,
  });
  console.error(error);
};

const state = {
  prizeProps: null,
  user: null,
  fights: [],
};
/* eslint-disable */
const poney = function(obj) {
  const encrypted = CryptoJS.AES.encrypt(obj, state.user.key);
  return encrypted
    .toString()
    .replace(/\+/g, 'xMl3Jk')
    .replace(/\//g, 'Por21Ld')
    .replace(/\=/g, 'Ml32')
    .replace(/"/g, '');
};
/* eslint-enable */
const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'inc_fights', payload);
  },
  saveSentFights(_state, payload) {
    Vue.set(_state, 'sent_fights', payload);
  },
};

client.notifications = () => {};
client.subscribe((data, message) => {
  if (message[1].body === 'update') {
    store.dispatch('init');
  }
  if (message[1].body === 'complete') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Upgrade complete!',
    });
  }
  if (message[1].body === 'future') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'You received your FUTURE Tokens!',
    });
  }
  if (message[1].body === 'fight') {
    store.dispatch('refresh_sent_fights');
  }
  if (message[1].body === 'receiveattack') {
    store.dispatch('refresh_inc_fights');
    store.dispatch('notify', {
      type: 'error',
      message: 'You are under attack!',
    });
  }
  if (message[1].body === 'startattack') {
    store.dispatch('refresh_sent_fights');
    store.dispatch('notify', {
      type: 'success',
      message: 'Your troops are on their way to their destination!',
    });
  }
  if (message[1].body === 'unit') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Your troops are now available in the bootcamp!',
    });
  }
});

const actions = {
  init: ({ commit, rootState, dispatch }, accessToken = localStorage.getItem('drugwars_token')) =>
    new Promise((resolve, reject) => {
      if (accessToken) {
        sc.setAccessToken(accessToken);
        const { username } = rootState.auth;
        client
          .requestAsync('get_user', { username, token: accessToken })
          .then(user => {
            if (user && user.user && user.user.username) {
              Promise.all([client.requestAsync('get_prize_props', null)]).then(prizeProps => {
                commit('savePrizeProps', prizeProps);
                commit('saveUser', user);
                resolve();
              });
            } else {
              dispatch('signup').then(() => {
                Promise.delay(9000).then(() => {
                  window.location = '/';
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
            handleError(dispatch, err, 'Loading account failed');
            return reject(err);
          });
      }
    }),
  refresh_inc_fights: (
    { commit, rootState, dispatch },
    accessToken = localStorage.getItem('drugwars_token'),
  ) =>
    new Promise((resolve, reject) => {
      if (accessToken) {
        sc.setAccessToken(accessToken);
        const { username } = rootState.auth;
        client
          .requestAsync('get_inc_fights', { username, token: accessToken })
          .then(fights => {
            commit('saveFights', fights);
            resolve();
          })
          .catch(err => {
            console.log(err);
            handleError(dispatch, err, 'Loading incoming fights failed');
            return reject(err);
          });
      }
    }),
  refresh_sent_fights: (
    { commit, rootState, dispatch },
    accessToken = localStorage.getItem('drugwars_token'),
  ) =>
    new Promise((resolve, reject) => {
      if (accessToken) {
        sc.setAccessToken(accessToken);
        const { username } = rootState.auth;
        client
          .requestAsync('get_sent_fights', { username, token: accessToken })
          .then(fights => {
            commit('saveSentFights', fights);
            resolve();
          })
          .catch(err => {
            console.log(err);
            handleError(dispatch, err, 'Loading sent fights failed');
            return reject(err);
          });
      }
    }),
  signup: ({ rootState, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {};
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.referrer = localStorage.getItem('drugwars_referrer') || null; // eslint-disable-line no-param-reassign
      payload.type = 'dw-chars'; // eslint-disable-line no-param-reassign
      sc.customEvent(username, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Sign up failed');
          return reject(err);
        }
        return resolve(result);
      });
    }),
  upgradeBuilding: ({ rootState, dispatch }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-upgrades'; // eslint-disable-line no-param-reassign
      payload = poney(JSON.stringify(payload)); // eslint-disable-line no-param-reassign
      sc.customEvent(username, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Upgrade building failed');
          return reject(err);
        }
        return resolve(result);
      });
    }),
  recruitUnit: ({ rootState, dispatch }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-units'; // eslint-disable-line no-param-reassign
      payload = poney(JSON.stringify(payload)); // eslint-disable-line no-param-reassign
      sc.customEvent(username, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Recruit unit failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  investHeist: ({ rootState, dispatch }, amount) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      let payload = {
        username,
        amount: Number(amount),
        type: 'dw-heists',
      };
      payload = poney(JSON.stringify(payload)); // eslint-disable-line no-param-reassign
      sc.customEvent(username, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Invest heist failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  startFight: ({ rootState, dispatch }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload = poney(JSON.stringify(payload)); // eslint-disable-line no-param-reassign
      sc.customEventNext(username, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Start fight failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        Promise.delay(65000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  shareFight: ({ dispatch }, post) =>
    new Promise((resolve, reject) => {
      sc.broadcast(post, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Share fight failed');
          return reject(err);
        }
        dispatch('notify', {
          type: 'success',
          message: 'You have successfully shared your fight on Steemit',
        });
        return resolve(result);
      });
    }),
  send: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload = poney(JSON.stringify(payload)); // eslint-disable-line no-param-reassign
      sc.customEventNext(username, payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  requestPayment: ({ rootState, dispatch }, { memo, amount }) => {
    const { username } = rootState.auth;
    const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=${amount}&memo=${memo}`;
    const win = window.open(
      url.split('+').join('_'),
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
    );
    win.focus();
    Promise.delay(30000).then(() => {
      dispatch('init');
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
