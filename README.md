# url-naong

[![Download Status](https://img.shields.io/npm/dw/url-naong.svg)](https://npmcharts.com/compare/url-naong?minimal=true)
[![Github Star](https://img.shields.io/github/stars/imjuni/url-naong.svg?style=popout)](https://github.com/imjuni/url-naong)
[![Github Issues](https://img.shields.io/github/issues-raw/imjuni/url-naong.svg)](https://github.com/imjuni/url-naong/issues)
[![NPM version](https://img.shields.io/npm/v/url-naong.svg)](https://www.npmjs.com/package/url-naong)
[![License](https://img.shields.io/npm/l/url-naong.svg)](https://github.com/imjuni/url-naong/blob/master/LICENSE)
[![url-naong](https://circleci.com/gh/imjuni/url-naong.svg?style=shield)](https://app.circleci.com/pipelines/github/imjuni/url-naong?branch=master)

url-naong is url builder that is inspired by [urlcat](https://github.com/balazsbotond/urlcat)

naong is korean name of Meowth(pokemon monster)

## install

```bash
npm install url-naong --save
```

## Usage

```ts
const urlna = require('url-naong').default;

const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', 
  { name: 'ironman', hid: 1, cid: 13, tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333', }
);

console.log(url);

// created> '/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333'
```

## TypeScript

```ts
import urlna from 'url-naong';

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
