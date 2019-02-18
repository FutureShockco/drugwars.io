import Promise from 'bluebird';
import kbyte from 'kbyte';

Promise.promisifyAll(kbyte.Client.prototype);
const client = new kbyte.Client('wss://api.drugwars.io');

export default client;
