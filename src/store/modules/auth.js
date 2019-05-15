import Vue from 'vue';
import sc from '@/helpers/steemconnect';
import client from '@/helpers/client';

const state = {
  username: null,
  account: null,
  auth_type: null,
};

const mutations = {
  saveUsername(_state, payload) {
    Vue.set(_state, 'username', payload);
  },
  // saveAccount(_state, payload) {
  //   Vue.set(_state, 'account', payload);
  // },
  logout(_state) {
    Vue.set(_state, 'username', null);
  },
};

const actions = {
  login: async ({ commit } ) =>
    new Promise(resolve => {
      if(localStorage.getItem('social_access_token'))
      {
        const token = localStorage.getItem('social_access_token')
        client
          .requestAsync('login', {token})
          .then(result => {
            commit('saveUsername', result);
            resolve(result);
          })
          .catch((e) => {
            resolve(e);
          });
      }
      else {
        resolve();
      }
    }),
  logout: () => {
    localStorage.removeItem('social_access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('loggedIn');
    window.location = '/';
  },
};

export default {
  state,
  mutations,
  actions,
};
