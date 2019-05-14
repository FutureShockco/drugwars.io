import client from '@/helpers/client';      
const Promise = require('bluebird');

const dwsocial = function (username, payload , cb) {
  let auth_type = "";
  let accessToken = "";
  if(localStorage.getItem('social_access_token'))
  {
    accessToken = localStorage.getItem('social_access_token')
    auth_type = "social"
  }
  client
  .requestAsync('custom_event', { username, auth:auth_type, token: accessToken, payload })
  .then(result => {
    console.log(result)
    cb(result)
  })
  .catch(err => {
    cb(err);
  });
  };






export default dwsocial;