import steemconnect from 'steemconnect';

const client = steemconnect.Initialize({
  app: 'drugwars.app',
  callbackURL: 'https://beta.drugwars.io/callback',
  // callbackURL: 'http://localhost:8080/callback',
});

export default client;
