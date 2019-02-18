import Vue from 'vue';

const state = {
  sidebarVisible: false,
  showLoading: false,
};

const mutations = {
  toggleSidebarVisibility(_state) {
    Vue.set(_state, 'sidebarVisible', !_state.sidebarVisible);
  },
  showLoading(_state) {
    Vue.set(_state, 'showLoading', true);
  },
  hideLoading(_state) {
    Vue.set(_state, 'hideLoading', false);
  },
};

const actions = {
  toggleSidebarVisibility({ commit }) {
    commit('toggleSidebarVisibility');
  },
  showLoading({ commit }) {
    commit('showLoading');
  },
  hideLoading({ commit }) {
    commit('hideLoading');
  },
};

export default {
  state,
  mutations,
  actions,
};
