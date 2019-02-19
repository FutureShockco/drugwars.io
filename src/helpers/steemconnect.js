import steemconnect from 'steemconnect';

const customId = process.env.VUE_APP_CUSTOM_ID;

const client = steemconnect.Initialize({
  app: process.env.VUE_APP_SC_CLIENT_ID,
  callbackURL: process.env.VUE_APP_SC_REDIRECT_URI,
});

client.customEvent = (username, type, payload, cb) => client.broadcast([
  ['custom_json', {
    id: customId,
    required_auths: [],
    required_posting_auths: [username],
    json: JSON.stringify({ type, payload }),
  }],
], cb);

export default client;
