import Vue from 'vue';
import sc from '@/helpers/steemconnect';

const state = {
  username: null,
};

const mutations = {
  saveUsername(_state, payload) {
    Vue.set(_state, 'username', payload);
  },
};

const actions = {
  login: async ({ commit }, accessToken = localStorage.getItem('drugwars_token')) =>
    new Promise((resolve) => {
      if (accessToken) {
        sc.setAccessToken(accessToken);
        sc.me((err, result) => {
          if (err || !result) {
            resolve();
          } else {
            localStorage.setItem('drugwars_token', accessToken);
            commit('saveUsername', result.name);
            resolve();
          }
        });
      } else {
        resolve();
      }
    }),
};

export default {
  state,
  mutations,
  actions,
};
