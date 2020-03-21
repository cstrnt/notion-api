# Unofficial Notion.so API Wrapper (WIP)

![npm](https://img.shields.io/npm/v/notion-api-js.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/notion-api-js.svg)

This repository contains an unofficial port of the [Notion](https://notion.so) API to Node.js. **Important**: It only works in the backend using Node.js and not in a client-side environment.

**IMPORTANT**: You need a token to use the Notion API. You can obtain them by reading your local cookie. You can find instructions for that below.

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

To create an instance, simply pass an object with the token you read from the cookie:

```js
// ES Modules syntax
import Notion from "notion-api-js";

// require syntax
const Notion = require("notion-api-js").default;

const notion = new Notion({
  token: "YOUR_TOKEN_V2"
});
```

You can also provide options for the HTML parsing:

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

Right now there is no official way of accessing the Notion API but there is a little work-around to get your credentials.

## Prerequisites

You need to have an account on [Notion.so](https://notion.so/) and need to be logged in.

## Getting your credentials

Most of the modern web browsers support inspecting cookies visually using the browser's devtools.
You can read how to do it in your browser here:

- [Chrome](https://developers.google.com/web/tools/chrome-devtools/manage-data/cookies)
- [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)

After you found the Notion.so cookie, look for an entry called `token_v2`. It is the necessary credential for the `Notion` instance. Simply copy them when you create the instance.

# Instance Options

The options are optionally passed to the instance as a parameter. Those options contain information on how the HTML will be parsed and returned using the instance methods.

### Colors (Object)

Contains definitions for the colors. If this option is omitted the default HTML colors like orange, pink and blue are used. You can change this behavior by passing an object containing color definitions. Example:

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

### PageUrl (String)

The PageUrl is the string passed to the `<a>` tag and is used to build the href of it. The id is inserted after the passed string.
By default it looks like this `/page?id=`, which results in `<a href="/page?id=SOME_ID">Hello World</a>`

# Instance Methods

- [getPages](<#getPages()>)
- [getPageById](<#getPageById(pageId)>)
- [getPagesByIndexId](<#getPagesByIndexId(pageId)>)
- [getAllHTML](<#getAllHTML()>)

## getPages()

Gets all pages of the user by the userId passed to the `Notion ` instance. All pages are parsed to HTML.

**Example**

```js
notion.getPages().then(pages => {
  // Your Code here
});
```

## getPageById(pageId)

Gets a Notion page by the pageId and returns the parsed HTML.

**Parameters**:

| **Parameter** | **Type** | **Opt/Required** |
| ------------- | -------- | ---------------- |
| pageId        | string   | Required         |

**Example**

```js
notion.getPageById("pageId").then(page => {
  // Your code here
});
```

## getPagesByIndexId(pageId)

Gets a Notion page by the given pageId and all subpages of that page. Useful if you want to use a homepage.

**Parameters**:

| **Parameter** | **Type** | **Opt/Required** |
| ------------- | -------- | ---------------- |
| pageId        | string   | Required         |

**Example**

```js
notion.getPagesByIndexId("pageId").then(page => {
  // Your code here
});
```

## getAllHTML() [WIP]

Gets the HTML for all pages.

```js
notion.getAllHTML().then(html => {
  // Your Ccode here
});
```

# Disclaimer

It's really WIP right now but I would highly appreciate if you would like to contribute to the project. Just fork this repository and create a PR 😄
