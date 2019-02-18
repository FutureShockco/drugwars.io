import Vue from 'vue';
import kbyte from '@/helpers/kbyte';

const state = {
  prizeProps: null,
};

const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
};

const actions = {
  getPrizeProps({ commit }) {
    kbyte.requestAsync('get_prize_props', null).then((prizeProps) => {
      commit('savePrizeProps', prizeProps);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
