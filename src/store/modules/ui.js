import Vue from 'vue';

const state = {
  sidebarVisible: false,
  showLoading: false,
  timestamp: new Date().getTime(),
  notifications: [],
};

const mutations = {
  toggleSidebarVisibility(_state) {
    Vue.set(_state, 'sidebarVisible', !_state.sidebarVisible);
  },
  showLoading(_state) {
    Vue.set(_state, 'showLoading', true);
  },
  hideLoading(_state) {
    Vue.set(_state, 'showLoading', false);
  },
  updateTimestamp(_state) {
    Vue.set(_state, 'timestamp', new Date().getTime());
  },
  notify(_state, payload) {
    const timestamp = parseInt(new Date().getTime() / 1000);
    _state.notifications.push({ ...payload, timestamp });
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
  updateTimestamp({ commit }) {
    commit('updateTimestamp');
  },
  notify({ commit }, payload) {
    commit('notify', payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
