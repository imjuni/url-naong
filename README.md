# url-naong

[![Download Status](https://img.shields.io/npm/dw/url-naong.svg)](https://npmcharts.com/compare/url-naong?minimal=true)
[![Github Star](https://img.shields.io/github/stars/imjuni/url-naong.svg?style=popout)](https://github.com/imjuni/url-naong)
[![Github Issues](https://img.shields.io/github/issues-raw/imjuni/url-naong.svg)](https://github.com/imjuni/url-naong/issues)
[![NPM version](https://img.shields.io/npm/v/url-naong.svg)](https://www.npmjs.com/package/url-naong)
[![License](https://img.shields.io/npm/l/url-naong.svg)](https://github.com/imjuni/url-naong/blob/master/LICENSE)
[![url-naong](https://circleci.com/gh/imjuni/url-naong.svg?style=shield)](https://app.circleci.com/pipelines/github/imjuni/url-naong?branch=master)

`url-naong` is a simple url builder. The [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) class is great, but it doesn't allow you to apply variables to pathnames and arrays to querystrings. This is where `url-naong` comes in handy. url-naong is url builder that is inspired by [urlcat](https://github.com/balazsbotond/urlcat)

naong is korean name of [Meowth(pokemon monster)](https://www.pokemon.com/us/pokedex/meowth)

## install

```bash
npm install url-naong --save
```

## Usage

`urlna` function take 4 parameters.

1. (required) host
2. (required) pathname
3. (optional) path parameters and querystring
4. (optional) options of the qs library

### Variable in pathname

```js
const urlna = require('url-naong').urlna;

const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', 
  { 
    hid: 1, // evaluate in pathname
    cid: 13, // evaluate in pathname
    name: 'ironman', // evaluate in pathname
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333' // evaluate in querystring
  }
);

console.log(url);

// created> '/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333'
```

### Querystring

```js
const urlna = require('url-naong').urlna;

const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', 
  { 
    hid: 1, // evaluate in pathname
    cid: 13, // evaluate in pathname
    name: 'ironman', // evaluate in pathname
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333' // evaluate in querystring
  }
);

console.log(url);

// created> '/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333'
```

## TypeScript

```ts
import { urlna } from 'url-naong';

const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', 
  { name: 'ironman', hid: 1, cid: 13, tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333', }
);

console.log(url);

// created> '/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333'
```

## Array of querystring

url-naong using [qs](https://github.com/ljharb/qs) for stringify querystring. Section [Stringifying](https://github.com/ljharb/qs#stringifying) how to stringify array in querystring.

```ts
const urlna = require('url-naong').default;

 const url = urlna(
  undefined, '/hero/:hid/comic/:cid/name/:name',
  {
    name: 'ironman',
    hid: 1,
    cid: 13,
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    category: ['marvel', 'advengers', 'S.H.I.E.L.D'],
  },
  {
    arrayFormat: 'repeat',
  },
);

// created> '/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&category=marvel&category=advengers&category=S.H.I.E.L.D',
```
