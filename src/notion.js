const fetch = require('./lib/fetch');
const makeHTML = require('./lib/helpers');

class Notion {
  constructor({
    userId,
    token,
    options = {
      colors: {},
      pageUrl: '/page?id=',
    },
  }) {
    this.creds = {
      userId,
      token,
    };
    this.options = options;
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
        const { id, type, properties, format } = entries[key].value;
        return values.push({ id, type, properties, format });
      });
      return makeHTML(values, this.options);
    });
  }

  getAllHTML() {
    const pages = [];
    return this.getPages().then(pageIds =>
      Promise.all(pageIds.map(id => this.getPageById(id)))
        .then(a =>
          a.map(element => pages.push(makeHTML(element, this.options)))
        )
        .then(() => pages)
    );
  }
}
module.exports = Notion;
