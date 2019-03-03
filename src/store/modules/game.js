import Vue from 'vue';
import Promise from 'bluebird';
import sc from '@/helpers/steemconnect';

const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;

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
    new Promise(resolve => {
      const { username } = rootState.auth;
      fetch(`https://rest.drugwars.io/user/${username}`)
        .then(res => res.json())
        .then(user => {
          if (user) {
            Promise.all([
              fetch('https://rest.drugwars.io').then(res => res.json()),
              fetch(`https://rest.drugwars.io/fights/${username}`).then(res => res.json()),
            ]).then(([prizeProps, fights]) => {
              commit('saveUser', user);
              commit('savePrizeProps', prizeProps);
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
        });
    }),
  signup: ({ rootState }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        user_id: '5',
        username,
        icon: '5',
        referrer: localStorage.getItem('drugwars_referrer') || null,
      };
      sc.customEvent(username, 'dw-char', payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  upgradeBuilding: ({ rootState }, { id, level }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        username,
        building: id,
        level,
      };
      sc.customEvent(username, 'dw-upgrade', payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  recruitUnit: ({ rootState }, { unit, amount }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        username,
        unit,
        unit_amount: amount,
      };
      sc.customEvent(username, 'dw-unit', payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  investHeist: ({ rootState }, amount) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        username,
        amount,
      };
      sc.customEvent(username, 'dw-heist', payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  startFight: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      sc.customEventNext(username, 'fight', payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  requestPayment: ({ rootState }, { memo, amount }) => {
    const { username } = rootState.auth;
    const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=${amount}&memo=${memo}`;
    const win = window.open(url, '_blank');
    win.focus();
  },
};

export default {
  state,
  mutations,
  actions,
};
