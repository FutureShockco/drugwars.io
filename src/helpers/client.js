import Promise from 'bluebird';
import { Client } from 'drugwars';
import store from '@/store';

Promise.promisifyAll(Client.prototype);


let rawClient = new Client(store.state.game.server.api);
rawClient = Sub(rawClient);
const handler = {
  get(target, prop) {
    if (prop === 'restart') {
      return () => {
        rawClient = new Client(store.state.game.server.api);
        rawClient = Sub(rawClient);
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

function playAttackAlert() {
  const audio = new Audio(`../../public/audio/attack.mp3`);
  audio.play();
}

function Sub(rawClient) {
  rawClient.ws.onclose = function(event) {
    store.dispatch('disconnect');
  };
  rawClient.notifications = () => {};
  rawClient.subscribe((data, message) => {
    if (message[1].body && message[1].body.type === 'error') {
      store.dispatch('notify', {
        type: 'error',
        icon: 'stop',
        message: `${message[1].body.message}`,
      });
      return;
    }

    if (message[1].body && message[1].body.type === 'start_attack') {
      store.dispatch('refresh_fights_count');
      store.dispatch('refresh_sent_fights');
      store.dispatch('refresh_transport_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        icon: 'target',
        message: `${message[1].body.message}`,
      });
      return;
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
    if (message[1].body === 'dwd') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'You received your DWD Tokens!',
      });
    }

    if (message[1].body === 'receiveattack') {
      store.dispatch('refresh_fights_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'error',
        message: 'Some opponents troops are coming to your base!',
      });
      if (localStorage.getItem('attack_alert')) {
        playAttackAlert();
      }
    }

    if (message[1].body === 'end_attack') {
      if (store.state.game.force_sent_fights_refresh) {
        store.dispatch('refresh_sent_fights');
      }
      store.dispatch('refresh_fights_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'Your troops have reached their destination!',
      });
    }

    if (message[1].body === 'end_transport') {
      store.dispatch('refresh_transport_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'Your troops have reached their destination!',
      });
    }

    if (message[1].body === 'end_station') {
      store.dispatch('refresh_station_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'Your troops have reached their station destination!',
      });
    }

    if (message[1].body === 'end_inc_attack') {
      store.dispatch('refresh_fights_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'error',
        message: 'You are under attack!',
      });
    } else if (message[1].body === 'end_inc_transport') {
      store.dispatch('refresh_fights_count');
      store.dispatch('refresh_transport_count');
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'You received some resources!',
      });
    } else if (message[1].body && message[1].body.type === 'unit') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        icon: 'person',
        message: `New troops ${message[1].body.message.unit} x${
          message[1].body.message.amount
        } are now available in ${message[1].body.message.territory}:${
          message[1].body.message.base
        }!`,
      });
    } else if (message[1].body && message[1].body.includes('started the job')) {
      setTimeout(() => {
        store.dispatch('init');
      }, 1000);
    } else if (message[1].body === 'gang_job_start') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'Your gang has started a new job!',
      });
    }
    if (message[1].body === 'job') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'There is a new about your job!',
      });
    }
    if (message[1].body === 'job_late') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'error',
        message: 'Ooops. You have been too late for this job! Your units are back.',
      });
    }
    if (message[1].body === 'job_success') {
      store.dispatch('init');
      store.dispatch('notify', {
        type: 'success',
        message: 'Job successfully done!',
      });
    }
  });
  return rawClient;
}

export default client;
