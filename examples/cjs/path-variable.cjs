const urlna = require('../../dist/cjs/index.cjs').urlna;

const url = urlna('', 'hero/:hid/comic/:cid/name/:name', {
  name: 'ironman',
  hid: 1,
  cid: 13,
  tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
});

console.log(url);
