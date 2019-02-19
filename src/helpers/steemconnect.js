import steemconnect from 'steemconnect';

const client = steemconnect.Initialize({
  app: process.env.VUE_APP_SC_CLIENT_ID,
  callbackURL: process.env.VUE_APP_SC_REDIRECT_URI,
});

export default client;
