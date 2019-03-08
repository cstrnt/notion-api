const Notion = require('./src/notion');

const options = {
  token_v2: '',
  userId: '',
};

const api = new Notion({ token: options.token_v2, userId: options.userId });
// Use the api here
