# Unofficial Notion.so Wrapper (WIP)

![npm](https://img.shields.io/npm/v/notion-api-js.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/notion-api-js.svg)

This Repository contains an unofficial port of the [Notion](https://notion.so) to Node.js. **Important**: It only works using Node.js in backend and not in a client-side environment.

**IMPORTANT**: You need a token to use the Notion API. You can obtain them by reading you local cookie. You can find instructions for that

# Documentation

- [Installation](#Installation)
- [Dependencies](#Dependencies)
- [Usage](#Usage)
- [Obtaining Credentials](#Obtaining-Credentials)
- [Instance Methods](#Instance-Methods)
- [Disclaimer](#Disclaimer)

# Installation

You can either use npm or yarn to install it:

```
npm i --save notion-api-js
```

```
yarn add notion-api-js
```

# Usage

## Creating an instance

To create an instance, simply pass an Object with your notion `token_v2`.

```js
// ES Modules syntax
import Notion from "notion-api-js";

// require syntax
const Notion = require("notion-api.js");

const notion = new Notion({
  token: "YOUR_TOKEN_V2"
});
```

You can also provide options for the HTML parsing.

```js
const notion = new Notion({
  token: "YOUR_TOKEN_V2",
  options: {
    colors: {
      orange: 'CSS COLOR HERE'
    },
    pageUrl: 'ABSOLUTE PAGE URL (e.g. /posts/'),
  }
});
```

# Obtaining Credentials

Right now there is no official way how to access the Notion API, but there is a little work-around to get your credentials.

## Prerequisites

You need to have an Account on Notion.so and need to be logged in.

## Getting your credentials

Most of the modern web browsers support inspecting cookies visually using the browser's devtools.
You can read how to do it in your browser here:

- [Chrome](https://developers.google.com/web/tools/chrome-devtools/manage-data/cookies)
- [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)

After you found the Notion.so cookie, look for `token_v2`. It is the necessary credential for the `Notion` instance. Simply copy them when you create the instance

# Instance Options

The Options are optionally passed to the instance as a parameter. Those options contain information on how the HTML will be parsed and returned using the instance methods.

### Colors (Object)

Contains definitions for the colors. If this option is omitted the default html colors like orange, pink and blue are used. You can change this behaviour by passing an object containing colour definitions. Example:

```js
options: {
    colors: {
      red: 'tomato',
      blue: 'rgb(100, 149, 237)',
      purple: '#9933cc',
    }
}
```

Possible colors are:

- red
- brown
- orange
- yellow
- teal
- blue
- purple
- pink
- red

### PageUrl (String)

The PageUrl is the string passed to the `<a>` tag and is used to build the href of it. The id is inserted after the passed string.
By default it looks like this `/page?id=`, which results into `<a href="/page?id=SOME_ID">Hello World</a>`

# Instance Methods

- [getPages](<#getPages()>)
- [getPageById](<#getPageById(pageId)>)
- [getAllHTML](<#getAllHTML()>)

## getPages()

Gets all pages of the user by the userId passed to the Notion instance. All pages are parsed to HTML.

**Example**

```js
notion.getPages().then(pages => {
  // Your Code here
});
```

## getPageById(pageId)

Gets a Notion page by the pageId and returns it parsed to HTML.

**Parameters**:

| **Parameter** | **Type** | **Opt/Required** |
| ------------- | -------- | ---------------- |
| pageId        | string   | Required         |

**Example**

```js
notion.getPageById("pageID").then(page => {
  // Your Code here
});
```

## getAllHTML() [WIP]

Gets the HTML for all pages.

```js
notion.getAllHTML().then(html => {
  // Your Code here
});
```

# Disclaimer

It's really WIP right now but I would highly appreciate if you would like to contribute to the project. Just fork this repo and create a PR 😄
