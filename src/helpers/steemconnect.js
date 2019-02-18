import steemconnect from 'steemconnect';

const client = steemconnect.Initialize({
  app: 'drugwars.app',
  callbackURL: 'https://staging.drugwars.io/#!/login',
});

export default client;
