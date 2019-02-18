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
  login: async ({ commit }, accessToken) => new Promise((resolve, reject) => {
    sc.setAccessToken(accessToken);
    sc.me((err, result) => {
      if (err || !result) {
        reject();
      } else {
        localStorage.setItem('drugwars_access_token', accessToken);
        commit('saveUsername', result.name);
        resolve();
      }
    });
  }),
};

export default {
  state,
  mutations,
  actions,
};
