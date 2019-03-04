import { Client } from 'dsteem';

const CLIENT_OPTIONS = { timeout: 15000 };

let rawClient = new Client('https://api.steemit.com', CLIENT_OPTIONS);

const handler = {
  get(target, prop) {
    if (prop === 'updateClient') {
      return address => {
        rawClient = new Client(address, CLIENT_OPTIONS);
      };
    }

    return rawClient[prop];
  },
};

const client = new Proxy({}, handler);

export default client;
