import Vue from 'vue';
import Promise from 'bluebird';
import kbyte from '@/helpers/kbyte';
import sc from '@/helpers/steemconnect';

const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;

const state = {
  prizeProps: null,
  props: null,
  user: null,
  isRegistred: false,
  fights: [],
};

const mutations = {
  saveProps(_state, payload) {
    Vue.set(_state, 'props', payload);
  },
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'fights', payload);
  },
  setRegistred(_state) {
    Vue.set(_state, 'isRegistred', true);
  },
};

const actions = {
  init: ({ commit, rootState, dispatch }) =>
    new Promise(resolve => {
      const { username } = rootState.auth;
      kbyte
        .requestAsync('get_user', username)
        .then(user => {
          Promise.all([
            kbyte.requestAsync('get_props', null),
            kbyte.requestAsync('get_prize_props', null),
            kbyte.requestAsync('get_fights', username),
          ]).then(([props, prizeProps, fights]) => {
            commit('saveProps', props);
            commit('savePrizeProps', prizeProps);
            commit('saveUser', user);
            commit('saveFights', fights);
            resolve();
          });
        })
        .catch(e => {
          if (!rootState.game.isRegistred) {
            dispatch('signup').then(() => {
              commit('setRegistred');
              Promise.delay(3000).then(() => dispatch('init'));
            });
          } else {
            Promise.delay(3000).then(() => dispatch('init'));
          }
        });
    }),
  signup: ({ commit, rootState }) =>
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
  startFight: ({ rootState }, { target, units }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        target,
        units,
      };
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
