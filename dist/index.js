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
const notion_1 = require("./src/notion");
const options = {
    token_v2: '828227322c2c14e874045a4e38971bb3b81e06e6f4d030ef806ddb6c61720cc973c099fffef9c297e1db49a03a1d7ab757d2854d40861cd982b6431465c1bb7fcc2b0f87ecaaa66d3ea758e44315'
};
const api = new notion_1.default({
    token: options.token_v2,
    options: {
        pageUrl: '/posts/',
        colors: {
            red: 'tomato',
            blue: 'rgb(100, 149, 237)',
            purple: '#9933cc'
        }
    }
});
(function abc() {
    return __awaiter(this, void 0, void 0, function* () {
        const pa = yield api.getPages();
        const p = yield api.getPageById(pa[0]);
        console.log(p);
    });
})();
