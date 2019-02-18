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
};

const actions = {
  init({ commit }) {
    Promise.all([
      kbyte.requestAsync('get_props', null),
      kbyte.requestAsync('get_prize_props', null),
    ]).then(([props, prizeProps]) => {
      commit('saveProps', props);
      commit('savePrizeProps', prizeProps);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
