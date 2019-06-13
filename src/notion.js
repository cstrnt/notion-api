const fetch = require('./lib/fetch');
const makeHTML = require('./lib/helpers');

/**
 * The Notion API Wrapper Class
 */
class Notion {
  /**
   * Creates a new Notion API Wrapper instance
   * if no token is provided it will look for the ENV Variable NOTION_TOKEN
   * @param {Object} Options
   */
  constructor({
    token,
    options = {
      colors: {},
      pageUrl: '/page?id=',
    },
  }) {
    const notionToken = token || process.env.NOTION_TOKEN;
    if (!notionToken)
      throw new Error('You need to provide the token to use the API');
    this.creds = {
      token: notionToken,
    };
    this.options = options;
  }

  /**
   * Gets all PageIds from the user
   */
  getPages() {
    return fetch({ endpoint: 'loadUserContent', creds: this.creds })
      .then(r => {
        const pages = r.recordMap.block;
        return Object.keys(pages || {});
      })
      .catch(e => console.log(e));
  }

  /**
   * Gets the content of a page by ID as HTML
   * @param {string} pageId The ID of the notion page
   */
  getPageById(pageId) {
    return fetch({
      endpoint: 'loadPageChunk',
      creds: this.creds,
      body: { pageId },
    })
      .then(r => {
        const entries = r.recordMap.block;
        const values = Object.keys(entries).map(key => {
          const { id, type, properties, format } = entries[key].value;
          return { id, type, properties, format };
        });
        return makeHTML(values, this.options);
      })
      .catch(e => console.log(e));
  }

  /**
   * Gets all HTML (WIP)
   */
  getAllHTML() {
    const pages = [];
    return this.getPages()
      .then(pageIds =>
        Promise.all(pageIds.map(id => this.getPageById(id)))
          .then(a =>
            a.map(element => pages.push(makeHTML(element, this.options)))
          )
          .then(() => pages)
      )
      .catch(e => console.log(e));
  }
}
module.exports = Notion;
