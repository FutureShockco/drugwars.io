import Promise from 'bluebird';
import { Client } from 'drugwars';

Promise.promisifyAll(Client.prototype);
const client = new Client(process.env.VUE_APP_WS_API_URL);

export default client;
