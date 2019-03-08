const fetch = require('./lib/fetch');
const makeHTML = require('./lib/helpers');

class Notion {
  constructor({ userId, token }) {
    this.creds = {
      userId,
      token,
    };
  }

  getPages() {
    return fetch({ endpoint: 'loadUserContent', creds: this.creds }).then(r => {
      const pages = r.recordMap.block;
      return Object.keys(pages || {});
    });
  }

  getPageById(pageId) {
    return fetch({
      endpoint: 'loadPageChunk',
      creds: this.creds,
      body: { pageId },
    }).then(r => {
      const values = [];
      const entries = r.recordMap.block;
      Object.keys(entries).map(key => {
        const { id, type, properties } = entries[key].value;
        return values.push({ id, type, properties });
      });
      return values;
    });
  }

  getAllHTML() {
    const pages = [];
    return this.getPages().then(pageIds =>
      Promise.all(pageIds.map(id => this.getPageById(id)))
        .then(a => a.map(element => pages.push(makeHTML(element))))
        .then(() => pages)
    );
  }
}
module.exports = Notion;
