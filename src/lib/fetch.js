const fetch = require('cross-fetch');

const BASEURL = 'https://www.notion.so/api/v3/';

function request({ endpoint, creds: { userId, token }, body }) {
  return fetch(`${BASEURL}${endpoint}`, {
    credentials: 'include',
    headers: {
      accept: '*/*',
      'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      cookie: `token_v2=${token}; userId=${userId};`,
    },
    body: JSON.stringify({
      ...body,
      limit: 50,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    }),
    method: 'POST',
    mode: 'cors',
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}
module.exports = request;
