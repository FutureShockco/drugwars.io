import { Client } from 'steemconnect';

const customId = process.env.VUE_APP_CUSTOM_ID;

const client = new Client({
  app: process.env.VUE_APP_SC_CLIENT_ID,
  callbackURL: process.env.VUE_APP_SC_REDIRECT_URI,
});

client.customEvent = (author, payload, cb) =>
  client.broadcast(
    [
      [
        'custom_json',
        {
          id: customId,
          required_auths: [],
          required_posting_auths: [author],
          json: JSON.stringify(payload),
        },
      ],
    ],
    cb,
  );

export default client;
