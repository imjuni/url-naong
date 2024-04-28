import { urlna } from '../../dist/esm/index.mjs';

const url01 = urlna('', 'heros/comics', {
  name: ['ironman', 'spiderman'],
  tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
});

const url02 = urlna(
  '',
  'heros/comics',
  {
    name: ['ironman', 'spiderman'],
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
  },
  {
    arrayFormat: 'repeat',
  },
);

console.log(url01);
console.log(url02);
