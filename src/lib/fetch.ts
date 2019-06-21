import fetch from "node-fetch";

const BASEURL = "https://www.notion.so/api/v3/";

function request({
  endpoint,
  creds: { token },
  body
}: {
  endpoint: string;
  creds: { token: string };
  body?: object;
}) {
  return fetch(`${BASEURL}${endpoint}`, {
    headers: {
      accept: "*/*",
      "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      cookie: `token_v2=${token};`
    },
    body: JSON.stringify({
      ...body,
      limit: 50,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    }),
    method: "POST"
  })
    .then(response => response.json())
    .catch((error: Error) => console.error(error));
}
export default request;
