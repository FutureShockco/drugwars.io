import Vue from 'vue';
import Promise from 'bluebird';
import client from '@/helpers/client';
import store from '@/store';
import sc from '@/helpers/steemconnect';
import dwsocial from '@/helpers/dwsocial';
import SSC from 'sscjs';

// import * as util from 'util';
// import { inspect } from 'util';
const dealerSteemUsername = process.env.VUE_APP_DEALER_STEEM_USERNAME;
const defaultErrorMessage = 'Oops something went wrong';

const handleError = (dispatch, error, message = defaultErrorMessage) => {
  dispatch('notify', {
    type: 'error',
    message: error.error_description || error.error || message,
  });
  console.error(error);
};

const state = {
  prizeProps: null,
  user: null,
  fights: [],
  gang_buildings: [],
  chat: false,
  isconnected: null,
  base: null,
  mainbase: null,
  steemengine: null,
};

const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'inc_fights', payload);
  },
  saveSentFights(_state, payload) {
    Vue.set(_state, 'sent_fights', payload);
  },
  saveFightsCount(_state, payload) {
    Vue.set(_state, 'inc_fights_count', payload);
  },
  saveSentFightsCount(_state, payload) {
    Vue.set(_state, 'sent_fights_count', payload);
  },
  saveIncTransportsCount(_state, payload) {
    Vue.set(_state, 'inc_transports_count', payload);
  },
  saveSentTransportsCount(_state, payload) {
    Vue.set(_state, 'sent_transports_count', payload);
  },
  saveIncStationsCount(_state, payload) {
    Vue.set(_state, 'inc_stations_count', payload);
  },
  saveSentStationsCount(_state, payload) {
    Vue.set(_state, 'sent_stations_count', payload);
  },
  saveGangBuildings(_state, payload) {
    Vue.set(_state, 'gang_buildings', payload);
  },
  saveGangEvents(_state, payload) {
    Vue.set(_state, 'gang_events', payload);
  },
  saveConnected(_state, payload) {
    Vue.set(_state, 'isconnected', payload);
  },
  saveBase(_state, payload) {
    Vue.set(_state, 'base', payload);
  },
  saveMainBase(_state, payload) {
    Vue.set(_state, 'mainbase', payload);
  },
  saveSE(_state, payload) {
    Vue.set(_state, 'steemengine', payload);
  },
};

const authToken = function() {
  let accessToken = null;
  if (localStorage.getItem('access_token')) {
    accessToken = localStorage.getItem('access_token');
  }
  return accessToken;
};

const actions = {
  init: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let totalbases = 0;
      if (state.user && state.user.buildings) {
        totalbases = state.user.buildings.find(b => b.building === 'headquarters').length;
      }
      if (token) {
        client
          .requestAsync('get_user', { token })
          .then(user => {
            if (user && user.user && user.user.username) {
              Promise.all([client.requestAsync('get_prize_props', null)]).then(([prizeProps]) => {
                commit('savePrizeProps', prizeProps);
                commit('saveUser', user);
                commit('saveConnected', true);
                commit(
                  'saveBase',
                  state.user.buildings.find(b => b.main === 1 && b.territory != 0 && b.base != 0),
                );
                if (
                  !state.base ||
                  totalbases != state.user.buildings.find(b => b.building === 'headquarters').length
                )
                  commit(
                    'saveMainBase',
                    state.user.buildings.find(
                      b =>
                        b.main === 1 &&
                        b.territory != 0 &&
                        b.base != 0 &&
                        b.building === 'headquarters',
                    ),
                  );
                dispatch('refresh_inc_fights_count');
                dispatch('refresh_sent_fights_count');
                dispatch('refresh_sent_transport_count');
                dispatch('refresh_inc_transport_count');
                dispatch('refresh_sent_station_count');
                dispatch('refresh_inc_station_count');
                resolve();
              });
            } else {
              dispatch('signup').then(() => {
                Promise.delay(2000).then(() => {
                  window.location = '/';
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
            handleError(dispatch, err, 'Loading account failed');
            return reject(err);
          });
      }
    }),
  refresh_inc_fights: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let start = 0;
      let end = 50;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_inc_fights', { token, start, end })
        .then(fights => {
          commit('saveFights', fights);
          return resolve(fights);
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading incoming fights failed');
          return reject(err);
        });
    }),
  refresh_inc_fights_count: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_inc_fights_count', { token })
        .then(fights => {
          commit('saveFightsCount', fights);
          return resolve(fights);
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading incoming fights count failed');
          return reject(err);
        });
    }),
  refresh_sent_fights: ({ commit, dispatch }, limit) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      let start = 0;
      let end = 50;
      if (limit) {
        start = limit.start;
        end = limit.end;
      }
      client
        .requestAsync('get_sent_fights', { token, start, end })
        .then(fights => {
          commit('saveSentFights', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent fights failed');
          return reject(err);
        });
    }),
  refresh_sent_fights_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_sent_fights_count', { token })
        .then(fights => {
          commit('saveSentFightsCount', fights);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent fights count failed');
          return reject(err);
        });
    }),
  refresh_inc_transport_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_inc_transport_count', { token })
        .then(transports => {
          commit('saveIncTransportsCount', transports);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading inc transports count failed');
          return reject(err);
        });
    }),
  refresh_sent_transport_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_sent_transport_count', { token })
        .then(transports => {
          commit('saveSentTransportsCount', transports);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent transports count failed');
          return reject(err);
        });
    }),
  refresh_inc_station_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_inc_station_count', { token })
        .then(stations => {
          commit('saveIncStationsCount', stations);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading inc stations count failed');
          return reject(err);
        });
    }),
  refresh_sent_station_count: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_sent_station_count', { token })
        .then(stations => {
          commit('saveSentStationsCount', stations);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading sent stations count failed');
          return reject(err);
        });
    }),
  signup: ({ rootState }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {};
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.referrer = localStorage.getItem('drugwars_referrer') || null; // eslint-disable-line no-param-reassign
      payload.type = 'dw-chars'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  upgradeBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-upgrades'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  upgradeGangBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-gang-upgrades'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_gang_buildings');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  depositGangBuilding: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-gang-deposit'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_gang_buildings');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }
        return reject();
      });
    }),
  upgradeTraining: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-trainings'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  recruitUnit: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-units'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  investHeist: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'dw-heists'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  startFight: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          store.dispatch('refresh_sent_fights_count');
          store.dispatch('refresh_sent_fights');
          return resolve(result);
        }

        return reject();
      });
    }),
  transport: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      payload.username = username; // eslint-disable-line no-param-reassign
      payload.type = 'transport'; // eslint-disable-line no-param-reassign
      return dwsocial(username, payload, result => {
        if (result) {
          console.log(result);
          store.dispatch('init');
          store.dispatch('refresh_sent_fights');
          store.dispatch('refresh_sent_transport_count');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          return resolve(result);
        }

        return reject();
      });
    }),
  shareFight: ({ dispatch }, post) =>
    new Promise((resolve, reject) => {
      sc.broadcast(post, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Share fight failed');
          return reject(err);
        }
        dispatch('notify', {
          type: 'success',
          message: 'You have successfully shared your fight on Steemit',
        });
        return resolve(result);
      }).catch(e => reject(e));
    }),
  send: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      // console.log(payload);
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          store.dispatch('init');
          return resolve(result);
        }
        return reject();
      });
    }),
  missions: ({ rootState }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      return dwsocial(username, payload, result => {
        if (result) {
          store.dispatch('init');
          store.dispatch('notify', {
            type: 'success',
            message: result,
          });
          store.dispatch('refresh_sent_fights_count');
          store.dispatch('refresh_sent_fights');
          store.dispatch('refresh_sent_transport_count');
          return resolve(result);
        }
        return reject();
      });
    }),
  refresh_gang_buildings: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const token = authToken();
      client
        .requestAsync('get_gang_private', { token })
        .then(result => {
          commit('saveGangBuildings', result);
          return resolve();
        })
        .catch(err => {
          console.log(err);
          handleError(dispatch, err, 'Loading gang buildings failed');
          return reject(err);
        });
    }),
  requestPayment: ({ rootState, dispatch }, { memo, amount }) => {
    const { username } = rootState.auth;
    if (window.steem_keychain != null) {
      window.steem_keychain.requestTransfer(
        username,
        dealerSteemUsername,
        amount,
        memo,
        'STEEM',
        response => {
          if (response.success) {
            console.log('success');
            Promise.delay(1000).then(() => {
              dispatch('init');
            });
          } else {
            const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=${amount}&memo=${memo}`;
            const win = window.open(
              url.split('+').join('_'),
              '_blank',
              'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
            );
            win.focus();
            Promise.delay(15000).then(() => {
              dispatch('init');
            });
          }
        },
      );
    } else {
      const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=${amount}&memo=${memo}`;
      const win = window.open(
        url.split('+').join('_'),
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
      );
      win.focus();
      Promise.delay(15000).then(() => {
        dispatch('init');
      });
    }
  },
  get_se_props: ({ commit, dispatch }) =>
    new Promise((resolve, reject) => {
      const ssc = new SSC('https://api.steem-engine.com/rpc/');
      ssc.find('tokens', 'tokens', { symbol: 'DWD' }, 1000, 0, [], (err, result) => {
        if (result) {
          const self = {};
          self.supply = result[0].circulatingSupply;
          self.maxSupply = result[0].maxSupply;
          ssc
            .find('market', 'metrics', { symbol: 'DWD' }, 1000, 0, '', false)
            .then(async metrics => {
              const [stat] = metrics;
              self.volume = stat.volume;
              self.priceChangePercent = stat.priceChangePercent.split('%')[0];
              self.priceChangeSteem = stat.priceChangeSteem;
              self.lastDayPrice = stat.lastDayPrice;
              self.lastPrice = stat.lastPrice;
              self.highestBid = stat.highestBid;
              self.lowestAsk = stat.lowestAsk;
              ssc.findOne(
                'tokens',
                'balances',
                {
                  account: `null`,
                  symbol: `DWD`,
                },
                (err, result) => {
                  self.nullBalance = result.balance;
                  commit('saveSE', self);
                },
              );
            });
        }
      });
    }),
  setBase: ({ commit }, payload) => {
    // console.log(payload);
    commit('saveBase', payload);
  },
  setMainBase: ({ commit }, payload) => {
    // console.log(payload);
    commit('saveMainBase', payload);
  },
  disconnect: ({ commit }) => {
    commit('saveConnected', false);
  },
};

export default {
  state,
  mutations,
  actions,
};
