import Vue from 'vue';
import kbyte from '@/helpers/kbyte';

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
};

export default {
  state,
  mutations,
  actions,
};
