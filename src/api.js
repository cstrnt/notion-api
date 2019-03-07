const fetch = require('node-fetch');

let _token;
let _userId;
let _projectIds;

class NotionAPI {
  constructor({ token, userId }) {
    try {
      fetch('https://www.notion.so/api/v3/loadUserContent', {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/json',
          cookie: `token_v2=${token}; userId=${userId};`,
        },
        method: 'POST',
        mode: 'cors',
      }).then(res => {
        if (res.status !== 200) throw new Error('User not authorized');
        res.json().then(json => {
          _token = token;
          _userId = userId;
          _projectIds = Object.keys(json.recordMap.block);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getPages() {
    _projectIds.map(key => this.getPageById(key));
  }

  // eslint-disable-next-line
  getPageById(pageId) {
    try {
      fetch('https://www.notion.so/api/v3/loadPageChunk', {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/json',
          cookie: `token_v2=${_token}; userId=${_userId};`,
        },
        body: JSON.stringify({
          pageId,
          limit: 50,
          chunkNumber: 0,
          verticalColumns: false,
        }),
        method: 'POST',
        mode: 'cors',
      })
        .then(res => res.json())
        .then(r => {
          const { block } = (r || {}).recordMap || {};
          if (block) {
            Object.keys(block).map(key => {
              const { value } = block[key];
              return console.log(
                `${(value || {}).type}: ${
                  ((value || {}).properties || {}).title
                }`
              );
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = NotionAPI;
