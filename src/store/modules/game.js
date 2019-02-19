import Vue from 'vue';
import kbyte from '@/helpers/kbyte';
import sc from '@/helpers/steemconnect';

const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;

const state = {
  prizeProps: null,
  props: null,
  user: null,
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
};

const actions = {
  init: ({ commit }, username) =>
    new Promise((resolve, reject) => {
      Promise.all([
        kbyte.requestAsync('get_props', null),
        kbyte.requestAsync('get_prize_props', null),
        kbyte.requestAsync('get_user', username),
      ]).then(([props, prizeProps, user]) => {
        commit('saveProps', props);
        commit('savePrizeProps', prizeProps);
        commit('saveUser', user);
        resolve();
      });
    }),
  upgradeBuilding: ({ commit, rootState }) =>
    new Promise((resolve, reject) => {
      sc.customEvent(rootState.auth.username, 'test', 'test', (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  requestPayment: ({ commit, rootState }) => {
    const username = rootState.auth.username;
    const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=0.001 STEEM`;
    const win = window.open(url, '_blank');
    win.focus();
  },
};

export default {
  state,
  mutations,
  actions,
};
