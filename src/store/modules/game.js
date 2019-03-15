import Vue from 'vue';
import Promise from 'bluebird';
import client from '@/helpers/client';
import sc from '@/helpers/steemconnect';

const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;
const defaultErrorMessage = 'Oops something went wrong';

const handleError = (dispatch, error, message = defaultErrorMessage) => {
  dispatch('addNotification', {
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

const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'fights', payload);
  },
};

const actions = {
  init: ({ commit, rootState, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      client
        .requestAsync('get_user', username)
        .then(user => {
          if (user && user.user && user.user.username) {
            Promise.all([
              client.requestAsync('get_prize_props', null),
              client.requestAsync('get_fights', username),
            ]).then(([prizeProps, fights]) => {
              commit('savePrizeProps', prizeProps);
              commit('saveUser', user);
              commit('saveFights', fights);
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
          handleError(dispatch, err, 'Loading account failed');
          return reject(err);
        });
    }),
  signup: ({ rootState, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        user_id: '5',
        username,
        icon: '5',
        referrer: localStorage.getItem('drugwars_referrer') || null,
      };
      sc.customEvent(username, 'dw-char', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Sign up failed');
          return reject(err);
        }
        return resolve(result);
      });
    }),
  upgradeBuilding: ({ rootState, dispatch }, { id, level }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        username,
        building: id,
        level,
      };
      sc.customEvent(username, 'dw-upgrade', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Upgrade building failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  recruitUnit: ({ rootState, dispatch }, { unit, amount }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        username,
        unit,
        unit_amount: amount,
      };
      sc.customEvent(username, 'dw-unit', payload, (err, result) => {
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
      const payload = {
        username,
        amount,
      };
      sc.customEvent(username, 'dw-heist', payload, (err, result) => {
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
      sc.customEventNext(username, 'fight', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Start fight failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  shareFight: ({ dispatch }, post) =>
    new Promise((resolve, reject) => {
      console.log('test');
      sc.broadcast(post, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Share fight failed');
          return reject(err);
        }
        Promise.then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  gangCreate: ({ rootState, dispatch }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      sc.customEventNext(username, 'gang-create', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Gang create failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
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
