import Promise from 'bluebird';
import { Client } from 'drugwars';

Promise.promisifyAll(Client.prototype);
const client = new Client('wss://api.drugwars.io');

export default client;
