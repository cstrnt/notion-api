"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("./lib/fetch");
const helpers_1 = require("./lib/helpers");
class Notion {
    constructor({ token, options = {
        colors: {},
        pageUrl: '/page?id='
    } }) {
        const notionToken = token || process.env.NOTION_TOKEN;
        if (!notionToken)
            throw new Error('You need to provide the token to use the API');
        this.creds = {
            token: notionToken
        };
        this.options = options;
    }
    getPages() {
        return fetch_1.default({ endpoint: 'loadUserContent', creds: this.creds })
            .then((r) => {
            const pages = r.recordMap.block;
            return Object.keys(pages);
        })
            .catch((e) => {
            console.log(e);
            return [];
        });
    }
    getPageById(pageId) {
        return fetch_1.default({
            endpoint: 'loadPageChunk',
            creds: this.creds,
            body: { pageId }
        })
            .then((r) => {
            const entries = r.recordMap.block;
            const values = Object.values(entries).map(value => {
                const { id, type, properties, format } = value.value;
                return { id, type, properties, format };
            });
            return helpers_1.default(values, this.options);
        })
            .catch((e) => {
            console.log(e);
            return '';
        });
    }
    getAllHTML() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageIds = (yield this.getPages());
                const elems = yield Promise.all(pageIds.map(id => this.getPageById(id)));
                return elems;
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.default = Notion;
