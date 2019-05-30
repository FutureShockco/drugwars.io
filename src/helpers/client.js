import Promise from 'bluebird';
import { Client } from 'drugwars';
import store from '@/store';

Promise.promisifyAll(Client.prototype);

let rawClient = new Client(process.env.VUE_APP_WS_API_URL);
rawClient.notifications = () => {};
rawClient.subscribe((data, message) => {
  if (
    message[1].body &&
    message[1].body.type !== undefined &&
    message[1].body.type === 'start_attack'
  ) {
    store.dispatch('refresh_sent_fights');
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: `Your troops are on their way to attack ${message[1].body.target}!`,
    });
  }

  if (message[1].body === 'update') {
    store.dispatch('init');
  }
  if (message[1].body === 'complete') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Upgrade complete!',
    });
  }
  if (message[1].body === 'training_complete') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Training complete!',
    });
  }
  if (message[1].body === 'future') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'You received your FUTURE Tokens!',
    });
  }
  if (message[1].body === 'fight') {
    store.dispatch('refresh_sent_fights_count');
    store.dispatch('init');
  }

  if (message[1].body === 'receiveattack') {
    store.dispatch('refresh_inc_fights_count');
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'error',
      message: 'Some opponents troops are coming to your base!',
    });
    if (localStorage.getItem('attack_alert')) {
      soundAlert.playAttackAlert();
    }
  }

  if (message[1].body === 'end_attack') {
    store.dispatch('refresh_sent_fights_count');
    store.dispatch('refresh_sent_fights');
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Your troops have reached their destination!',
    });
  }

  if (message[1].body === 'end_inc_attack') {
    store.dispatch('refresh_inc_fights_count');
    store.dispatch('refresh_inc_fights');
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'error',
      message: 'You are under attack!',
    });
  }

  if (message[1].body === 'start_attack') {
    store.dispatch('init');
    store.dispatch('refresh_sent_fights_count');
    store.dispatch('notify', {
      type: 'success',
      message: 'Your troops are on their way to their destination!',
    });
  }
  if (message[1].body === 'unit') {
    store.dispatch('init');
    store.dispatch('notify', {
      type: 'success',
      message: 'Your troops are now available in the bootcamp!',
    });
  }
});
const handler = {
  get(target, prop) {
    if (prop === 'restart') {
      return () => {
        rawClient = new Client(process.env.VUE_APP_WS_API_URL);
        rawClient.notifications = () => {};
        rawClient.subscribe((data, message) => {
          if (
            message[1].body &&
            message[1].body.type !== undefined &&
            message[1].body.type === 'start_attack'
          ) {
            store.dispatch('refresh_sent_fights');
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: `Your troops are on their way to attack ${message[1].body.target}!`,
            });
          }

          if (message[1].body === 'update') {
            store.dispatch('init');
          }
          if (message[1].body === 'complete') {
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: 'Upgrade complete!',
            });
          }
          if (message[1].body === 'training_complete') {
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: 'Training complete!',
            });
          }
          if (message[1].body === 'future') {
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: 'You received your FUTURE Tokens!',
            });
          }
          if (message[1].body === 'fight') {
            store.dispatch('refresh_sent_fights_count');
            store.dispatch('init');
          }

          if (message[1].body === 'receiveattack') {
            store.dispatch('refresh_inc_fights_count');
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'error',
              message: 'Some opponents troops are coming to your base!',
            });
            if (localStorage.getItem('attack_alert')) {
              soundAlert.playAttackAlert();
            }
          }

          if (message[1].body === 'end_attack') {
            store.dispatch('refresh_sent_fights_count');
            store.dispatch('refresh_sent_fights');
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: 'Your troops have reached their destination!',
            });
          }

          if (message[1].body === 'end_inc_attack') {
            store.dispatch('refresh_inc_fights_count');
            store.dispatch('refresh_inc_fights');
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'error',
              message: 'You are under attack!',
            });
          }

          if (message[1].body === 'start_attack') {
            store.dispatch('init');
            store.dispatch('refresh_sent_fights_count');
            store.dispatch('notify', {
              type: 'success',
              message: 'Your troops are on their way to their destination!',
            });
          }
          if (message[1].body === 'unit') {
            store.dispatch('init');
            store.dispatch('notify', {
              type: 'success',
              message: 'Your troops are now available in the bootcamp!',
            });
          }
        });
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
