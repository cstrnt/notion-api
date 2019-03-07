const fetch = require('node-fetch');

fetch('https://www.notion.so/api/v3/loadPageChunk', {
  credentials: 'include',
  headers: {
    accept: '*/*',
    'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/json',
    cookie:
      'token_v2=a0a3271f5155332746b56ead3cd822d95bb5dda6025457fa79cf411bab0bc0f780bad915652066c0d75c774d3268530ac7bd6dab574260cd59de931fa3479be33d05c5e13a9700063e8409922630; userId=de11c12e03bdaa8f0d05d64a5fb0578cd1551890861;',
  },
  referrer:
    'https://www.notion.so/Schule-27-02-2019-2361caf666e64bd38217e11e55920b82',
  referrerPolicy: 'same-origin',
  body:
    '{"pageId":"2361caf6-66e6-4bd3-8217-e11e55920b82","limit":50,"cursor":{"stack":[]},"chunkNumber":0,"verticalColumns":false}',
  method: 'POST',
  mode: 'cors',
})
  .then(res => res.json())
  .then(r => {
    const { block } = r.recordMap;
    Object.keys(block).map(key => {
      const prop = block[key].value.properties || {};
      return console.log(((prop.title || [])[0] || [])[0]);
    });
  });
