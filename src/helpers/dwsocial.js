import client from '@/helpers/client';

const dwsocial = function(username, payload, cb) {
  const accessToken = localStorage.getItem('access_token');
  client
    .requestAsync('custom_event', { username, token: accessToken, payload })
    .then(result => {
      console.log(result);
      cb(result);
    })
    .catch(err => {
      cb(err);
    });
};

export default dwsocial;
