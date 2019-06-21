import notionFetch from './lib/fetch';
import makeHTML from './lib/helpers';
import { NotionResponse, Options } from './lib/types';

/**
 * The Notion API Wrapper Class
 */
class Notion {
  creds: { token: string };
  options: Options;
  /**
   * Creates a new Notion API Wrapper instance
   * if no token is provided it will look for the ENV Variable NOTION_TOKEN
   * @param {Object} Options
   */
  constructor({
    token,
    options = {
      colors: {},
      pageUrl: '/page?id='
    }
  }: {
    token: string;
    options: Options;
  }) {
    const notionToken = token || process.env.NOTION_TOKEN;
    if (!notionToken)
      throw new Error('You need to provide the token to use the API');
    this.creds = {
      token: notionToken
    };
    this.options = options;
  }

  /**
   * Gets all PageIds from the user
   */
  getPages() {
    return notionFetch({ endpoint: 'loadUserContent', creds: this.creds })
      .then((r: NotionResponse) => {
        const pages = r.recordMap.block;
        return Object.keys(pages);
      })
      .catch((e: Error) => {
        console.log(e);
        return [] as Array<string>;
      });
  }

  /**
   * Gets the content of a page by ID as HTML
   * @param {string} pageId The ID of the notion page
   */
  getPageById(pageId: string) {
    return notionFetch({
      endpoint: 'loadPageChunk',
      creds: this.creds,
      body: { pageId }
    })
      .then((r: NotionResponse) => {
        const entries = r.recordMap.block;
        const values = Object.values(entries).map(value => {
          const { id, type, properties, format } = value.value;
          return { id, type, properties, format };
        });
        return makeHTML(values, this.options);
      })
      .catch((e: Error) => {
        console.log(e);
        return '';
      });
  }

  /**
   * Gets all HTML (WIP)
   */
  async getAllHTML() {
    try {
      const pageIds = (await this.getPages()) as Array<string>;
      const elems = await Promise.all(pageIds.map(id => this.getPageById(id)));
      return elems;
    } catch (error) {
      return [];
    }
  }
}
export default Notion;
