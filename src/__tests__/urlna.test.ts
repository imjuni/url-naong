/* eslint-disable max-len */
/* eslint-disable no-console */
import { urlna } from '..';

test('emptyhost01.path.parameter.test', () => {
  const url = urlna('', '/hero/:hid/comic/:cid/name/:name', {
    name: 'ironman',
    hid: 1,
    cid: 13,
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
  });

  console.log('RESULT: ', url);
  expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
});

test('emptyhost02.path.parameter.test', () => {
  const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', {
    name: 'ironman',
    hid: 1,
    cid: 13,
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
  });

  console.log('RESULT: ', url);
  expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
});

test('hostname.parameter.test', () => {
  const url = urlna('http://localhost', '/hero/:hid/comic/:cid/name/:name', {
    name: 'ironman',
    hid: 1,
    cid: 13,
    tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
  });

  console.log('RESULT: ', url);
  expect(url).toEqual(
    'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333',
  );
});

test('array.parameter.test', () => {
  const url = urlna(
    'http://localhost',
    '/hero/:hid/comic/:cid/name/:name',
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

  console.log('RESULT: ', url);
  expect(url).toEqual(
    'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&category=marvel&category=advengers&category=S.H.I.E.L.D',
  );
});

test('array.brackets.parameter.test', () => {
  const url = urlna(
    'http://localhost',
    '/hero/:hid/comic/:cid/name/:name',
    {
      name: 'ironman',
      hid: 1,
      cid: 13,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
      category: ['marvel', 'advengers', 'S.H.I.E.L.D'],
    },
    {
      arrayFormat: 'brackets',
      encode: false,
    },
  );

  console.log('RESULT: ', url);
  expect(url).toEqual(
    'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&category[]=marvel&category[]=advengers&category[]=S.H.I.E.L.D',
  );
});
