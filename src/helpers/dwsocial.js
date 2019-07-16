import client from '@/helpers/client';

function dwsocial(username, payload, cb) {
  const accessToken = localStorage.getItem('access_token');
  client
    .requestAsync('custom_event', { username, token: accessToken, payload })
    .then(result => {
      cb(result);
    })
    .catch(err => {
      cb(err);
    });
}

export default dwsocial;
