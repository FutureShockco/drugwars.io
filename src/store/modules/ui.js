import Vue from 'vue';

const state = {
  sidebarVisible: false,
  showLoading: false,
  timestamp: new Date().getTime(),
  notifications: [],
  steps:[],
  tourVisible:false
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
  setTour(_state, payload) {
    Vue.set(_state, 'steps', payload);
  },
  showTour(_state) {
    Vue.set(_state, 'tourVisible', true);
  },
  hideTour(_state) {
    Vue.set(_state, 'tourVisible', false);
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
  setTour({ commit }, payload) {
    commit('setTour', payload);
  },
  activateTour({ commit }) {
    commit('showTour');
  },
  disableTour({ commit }) {
    commit('hideTour');
  },
};

export default {
  state,
  mutations,
  actions,
};
