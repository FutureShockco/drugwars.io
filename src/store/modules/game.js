import Vue from 'vue';
import Promise from 'bluebird';
import client from '@/helpers/client';
import sc from '@/helpers/steemconnect';
import CryptoJS from 'crypto-js';
// import * as util from 'util';
// import { inspect } from 'util';
const customId = process.env.VUE_APP_CUSTOM_ID;
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
};

/* eslint-disable */
const poney = function(obj) {
  const gg56_0x94bf = ['\x77\x71\x6a\x44\x6d\x46\x4a\x61\x4d\x55\x30\x74'];
  (function(_0x3a9ea4, _0x236118) {
    const _0x495d13 = function(_0x57006a) {
      while (--_0x57006a) {
        _0x3a9ea4.push(_0x3a9ea4.shift());
      }
    };
    _0x495d13(++_0x236118);
  })(gg56_0x94bf, 0xd3);
  var gg56_0x8321 = function(_0x2b84d3, _0x5f2ce3) {
    _0x2b84d3 -= 0x0;
    let _0x334acd = gg56_0x94bf[_0x2b84d3];
    if (gg56_0x8321.DvbkVo === undefined) {
      (function() {
        const _0x37e765 = function() {
          let _0x50e112;
          try {
            _0x50e112 = Function(
              'return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');',
            )();
          } catch (_0x2eaafd) {
            _0x50e112 = window;
          }
          return _0x50e112;
        };
        const _0x2ea6a1 = _0x37e765();
        const _0x38c167 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        _0x2ea6a1.atob ||
          (_0x2ea6a1.atob = function(_0x1c9ae7) {
            const _0x1481a5 = String(_0x1c9ae7).replace(/=+$/, '');
            for (
              var _0x26d930 = 0x0, _0x8e7d60, _0x26bd07, _0x2b4006 = 0x0, _0x35e3d3 = '';
              (_0x26bd07 = _0x1481a5.charAt(_0x2b4006++));
              ~_0x26bd07 &&
              ((_0x8e7d60 = _0x26d930 % 0x4 ? _0x8e7d60 * 0x40 + _0x26bd07 : _0x26bd07),
              _0x26d930++ % 0x4)
                ? (_0x35e3d3 += String.fromCharCode(
                    0xff & (_0x8e7d60 >> ((-0x2 * _0x26d930) & 0x6)),
                  ))
                : 0x0
            ) {
              _0x26bd07 = _0x38c167.indexOf(_0x26bd07);
            }
            return _0x35e3d3;
          });
      })();
      const _0x556d8c = function(_0x5f3606, _0x5f2ce3) {
        let _0x5aa7a8 = [],
          _0x118c79 = 0x0,
          _0x2020b7,
          _0x1d3299 = '',
          _0xf1cf84 = '';
        _0x5f3606 = atob(_0x5f3606);
        for (
          let _0x183efd = 0x0, _0x46e106 = _0x5f3606.length;
          _0x183efd < _0x46e106;
          _0x183efd++
        ) {
          _0xf1cf84 += `%${`00${_0x5f3606.charCodeAt(_0x183efd).toString(0x10)}`.slice(-0x2)}`;
        }
        _0x5f3606 = decodeURIComponent(_0xf1cf84);
        for (var _0x40156d = 0x0; _0x40156d < 0x100; _0x40156d++) {
          _0x5aa7a8[_0x40156d] = _0x40156d;
        }
        for (_0x40156d = 0x0; _0x40156d < 0x100; _0x40156d++) {
          _0x118c79 =
            (_0x118c79 +
              _0x5aa7a8[_0x40156d] +
              _0x5f2ce3.charCodeAt(_0x40156d % _0x5f2ce3.length)) %
            0x100;
          _0x2020b7 = _0x5aa7a8[_0x40156d];
          _0x5aa7a8[_0x40156d] = _0x5aa7a8[_0x118c79];
          _0x5aa7a8[_0x118c79] = _0x2020b7;
        }
        _0x40156d = 0x0;
        _0x118c79 = 0x0;
        for (let _0x17d6e8 = 0x0; _0x17d6e8 < _0x5f3606.length; _0x17d6e8++) {
          _0x40156d = (_0x40156d + 0x1) % 0x100;
          _0x118c79 = (_0x118c79 + _0x5aa7a8[_0x40156d]) % 0x100;
          _0x2020b7 = _0x5aa7a8[_0x40156d];
          _0x5aa7a8[_0x40156d] = _0x5aa7a8[_0x118c79];
          _0x5aa7a8[_0x118c79] = _0x2020b7;
          _0x1d3299 += String.fromCharCode(
            _0x5f3606.charCodeAt(_0x17d6e8) ^
              _0x5aa7a8[(_0x5aa7a8[_0x40156d] + _0x5aa7a8[_0x118c79]) % 0x100],
          );
        }
        return _0x1d3299;
      };
      gg56_0x8321.TAVZCv = _0x556d8c;
      gg56_0x8321.PLEisv = {};
      gg56_0x8321.DvbkVo = !![];
    }
    const _0xecf080 = gg56_0x8321.PLEisv[_0x2b84d3];
    if (_0xecf080 === undefined) {
      if (gg56_0x8321.oJlUJR === undefined) {
        gg56_0x8321.oJlUJR = !![];
      }
      _0x334acd = gg56_0x8321.TAVZCv(_0x334acd, _0x5f2ce3);
      gg56_0x8321.PLEisv[_0x2b84d3] = _0x334acd;
    } else {
      _0x334acd = _0xecf080;
    }
    return _0x334acd;
  };
  const key =
    '\x66\x65\x65\x65\x64\x72\x75\x67\x77\x61\x72\x73\x38\x34\x38\x39' +
    '\x78\x65\x74\x74\x35\x31\x39\x36\x38\x39\x38\x34' +
    '\x74\x75\x62\x75';
  const crypted = CryptoJS.AES[gg56_0x8321('0x0', '\x53\x32\x23\x63')](obj, key).toString();
  const tc = crypted
    .replace(/\+/g, '\x78\x4d\x6c\x33\x4a\x6b')
    .replace(/\//g, '\x50\x6f\x72\x32\x31\x4c\x64')
    .replace(/\=/g, '\x4d\x6c\x33\x32');
  return tc;
};
/* eslint-enable */

const mutations = {
  savePrizeProps(_state, payload) {
    Vue.set(_state, 'prizeProps', payload);
  },
  saveUser(_state, payload) {
    Vue.set(_state, 'user', payload);
  },
  saveFights(_state, payload) {
    Vue.set(_state, 'fights', payload);
  },
};

const actions = {
  init: ({ commit, rootState, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      client
        .requestAsync('get_user', username)
        .then(user => {
          if (user && user.user && user.user.username) {
            Promise.all([
              client.requestAsync('get_prize_props', null),
              client.requestAsync('get_fights', username),
            ]).then(([prizeProps, fights]) => {
              commit('savePrizeProps', prizeProps);
              commit('saveUser', user);
              commit('saveFights', fights);
              resolve();
            });
          } else {
            dispatch('signup').then(() => {
              Promise.delay(9000).then(() => {
                window.location = '/';
              });
            });
          }
        })
        .catch(err => {
          handleError(dispatch, err, 'Loading account failed');
          return reject(err);
        });
    }),
  signup: ({ rootState, dispatch }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      const payload = {
        user_id: '5',
        username,
        icon: '5',
        referrer: localStorage.getItem('drugwars_referrer') || null,
      };
      sc.customEvent(username, 'dw-char', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Sign up failed');
          return reject(err);
        }
        return resolve(result);
      });
    }),
  upgradeBuilding: ({ rootState, dispatch }, { id, level }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      let payload = {
        username,
        building: id,
        level,
        type: 'dw-upgrades',
      };
      payload = poney(JSON.stringify(payload));
      sc.customEvent(username, customId, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Upgrade building failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  recruitUnit: ({ rootState, dispatch }, { unit, amount }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      let payload = {
        username,
        unit,
        unit_amount: amount,
        type: 'dw-units',
      };
      payload = poney(JSON.stringify(payload));
      sc.customEvent(username, customId, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Recruit unit failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  investHeist: ({ rootState, dispatch }, amount) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      let payload = {
        username,
        amount,
        type: 'dw-heists',
      };
      payload = poney(JSON.stringify(payload));
      sc.customEvent(username, customId, payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Invest heist failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        return resolve(result);
      });
    }),
  startFight: ({ rootState, dispatch }, payload) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      sc.customEventNext(username, 'fight', payload, (err, result) => {
        if (err) {
          handleError(dispatch, err, 'Start fight failed');
          return reject(err);
        }
        Promise.delay(6000).then(() => {
          dispatch('init');
        });
        Promise.delay(65000).then(() => {
          dispatch('init');
        });
        return resolve(result);
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
      });
    }),
  send: ({ rootState }, { type, payload }) =>
    new Promise((resolve, reject) => {
      const { username } = rootState.auth;
      sc.customEventNext(username, type, payload, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }),
  requestPayment: ({ rootState, dispatch }, { memo, amount }) => {
    const { username } = rootState.auth;
    const url = `https://steemconnect.com/sign/transfer?from=${username}&to=${dealerSteemUsername}&amount=${amount}&memo=${memo}`;
    const win = window.open(
      url.split('+').join('_'),
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=500,width=600,height=600',
    );
    win.focus();
    Promise.delay(30000).then(() => {
      dispatch('init');
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
