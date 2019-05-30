import Promise from 'bluebird';
import { Client } from 'drugwars';
import store from '@/store';

Promise.promisifyAll(Client.prototype);

let rawClient = new Client(process.env.VUE_APP_WS_API_URL);

const handler = {
  get(target, prop) {
    if (prop === 'restart') {
      return () => {
        rawClient = new Client(process.env.VUE_APP_WS_API_URL);
      };
    }
    return rawClient[prop];
  },
};

const client = new Proxy({}, handler);
client.requestAsync = (name, params) =>
  new Promise((resolve, reject) => {
    client.request(name, params, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

client.ws.onopen = function(event) {
  store.dispatch('reconnect');
};

client.ws.onclose = function(event) {
  store.dispatch('disconnect');
};

export default client;

// client.requestAsync = (name, params) =>
//   new Promise((resolve, reject) => {
//   client.request(name, params, (err, result) => {
//     if (err) return reject(err);
//       return resolve(result);
//     });
//   });

// export default client;

// import Promise from 'bluebird';
// import { Client } from 'drugwars';

// Promise.promisifyAll(Client.prototype);
// let client = new Client(process.env.VUE_APP_WS_API_URL);

// client.init = function(){
//   client.ws = new WebSocket(process.env.VUE_APP_WS_API_URL);
// }

// client.ws.onerror = function(err){
//   console.log(err)
// }

// export default client;
