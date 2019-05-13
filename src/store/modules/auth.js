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
  saveAuthType(_state,payload) {
    Vue.set(_state, 'auth_type', payload);
  },
  logout(_state) {
    Vue.set(_state, 'username', null);
  },
};

const authType = function (){
  let auth_type = "";
  let accessToken = "";
  if(localStorage.getItem('drugwars_token'))
  {
    accessToken = localStorage.getItem('drugwars_token');
    sc.setAccessToken(accessToken);
    auth_type = "sc";
  }
  else if(localStorage.getItem('social_access_token'))
  {
    accessToken = localStorage.getItem('social_access_token')
    auth_type = "social"
  }
  return [accessToken,auth_type]
}

const actions = {
  login: async ({ commit } ) =>
    new Promise(resolve => {
      if(authType())
      {
        const [token,auth] = authType()
        const params = {auth,token}
        client
          .requestAsync('login', params)
          .then(result => {
            commit('saveUsername', result);
            commit('saveAuthType', auth);
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
    localStorage.removeItem('drugwars_token');
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
