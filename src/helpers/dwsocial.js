import client from '@/helpers/client';      
const Promise = require('bluebird');

const dwsocial = function (username, payload , cb) {
  let auth_type = "";
  let accessToken = "";
  accessToken = localStorage.getItem('access_token')
  client
  .requestAsync('custom_event', { username, token: accessToken, payload })
  .then(result => {
    console.log(result)
    cb(result)
  })
  .catch(err => {
    cb(err);
  });
  };






export default dwsocial;