import fetch from "node-fetch";
import { NotionResponse } from "./types";

const BASEURL = "https://www.notion.so/api/v3/";

const getAllBlocks = async ({
  url,
  token,
  limit,
  stack,
  chunkNumber,
  res,
  resolve,
  reject,
  body,
} : {
  url: string,
  token: string,
  limit: number,
  stack: Array<any>,
  chunkNumber: number,
  res: { recordMap: {block: object } },
  resolve: Function,
  reject: Function,
  body?: object,
}) => {
  return fetch(url, {
    headers: {
      accept: "*/*",
      "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      cookie: `token_v2=${token};`
    },
    body: JSON.stringify({
      limit,
      cursor: { stack },
      chunkNumber,
      ...body,
      verticalColumns: false
    }),
    method: "POST"
  })
    .then(response => response.json())
    .then(r => {
      if (((r.cursor || {}).stack || {}).length) {
        getAllBlocks({
          url,token,limit, stack: r.cursor.stack,
          chunkNumber: chunkNumber + 1,
          res: {
            recordMap: {
              block: {
                ...res.recordMap.block,
                ...r.recordMap.block,
              }
            }
          },
          resolve,
          reject,
          body
        })
      } else {
        if (r.errorId) {
          reject(r);
        }
        const ret: NotionResponse = {
          recordMap: {
            block: {
              ...res.recordMap.block,
              ...(r.recordMap || {}).block,
            }
          }
        };
        resolve(ret)
      }
    })
    .catch((error: Error) => console.error(error));
};

function request({
  endpoint,
  creds: { token },
  body
}: {
  endpoint: string;
  creds: { token: string };
  body?: { limit?: number, pageId: string };
}): Promise<NotionResponse> {
  return new Promise((resolve, reject) => {
    getAllBlocks({
      url: `${BASEURL}${endpoint}`,
      token,
      limit: (body || { limit: 50 }).limit || 50,
      stack: [],
      chunkNumber: 0,
      res: {
        recordMap: { block: {} }
      },
      resolve,
      reject,
      body
    })
  });
}
export default request;
