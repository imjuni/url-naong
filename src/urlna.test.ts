import { describe, expect, it } from 'vitest';
import { urlna } from '.';

describe('urlna', () => {
  it('join function skip start slash removing', () => {
    const url = urlna('', 'hero/:hid/comic/:cid/name/:name', {
      name: 'ironman',
      hid: 1,
      cid: 13,
      age: undefined,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    });
    expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
  });

  it('emptyhost01.path.parameter.test', () => {
    const url = urlna('', '/hero/:hid/comic/:cid/name/:name', {
      name: 'ironman',
      hid: 1,
      cid: 13,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    });
    expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
  });

  it('emptyhost02.path.parameter.test', () => {
    const url = urlna(undefined, '/hero/:hid/comic/:cid/name/:name', {
      name: 'ironman',
      hid: 1,
      cid: 13,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    });
    expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
  });

  it('hostname.parameter.test', () => {
    const url = urlna('http://localhost', '/hero/:hid/comic/:cid/name/:name', {
      name: 'ironman',
      hid: 1,
      cid: 13,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    });
    expect(url).toEqual('http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
  });

  it('array.parameter.test', () => {
    const url = urlna(
      'http://localhost',
      '/hero/:hid/comic/:cid/name/:name',
      {
        name: 'ironman',
        hid: 1,
        cid: 13,
        tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
        teamIds: [1, 2, 3, 4],
        category: ['marvel', 'advengers', 'S.H.I.E.L.D'],
      },
      {
        arrayFormat: 'repeat',
      },
    );

    expect(url).toEqual(
      'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&teamIds=1&teamIds=2&teamIds=3&teamIds=4&category=marvel&category=advengers&category=S.H.I.E.L.D',
    );
  });

  it('array.parameter.test', () => {
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
    expect(url).toEqual(
      'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&category=marvel&category=advengers&category=S.H.I.E.L.D',
    );
  });

  it('array.brackets.parameter.test', () => {
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
    expect(url).toEqual(
      'http://localhost/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333&category[]=marvel&category[]=advengers&category[]=S.H.I.E.L.D',
    );
  });

  it('join function remove ends slash', () => {
    const url = urlna('', '/hero/:hid/comic/:cid/name/:name/', {
      name: 'ironman',
      hid: 1,
      cid: 13,
      tid: '72368bb0-a6cc-4fa1-9288-c903fd45c333',
    });
    expect(url).toEqual('/hero/1/comic/13/name/ironman?tid=72368bb0-a6cc-4fa1-9288-c903fd45c333');
  });

  it('no querystring', () => {
    const url = urlna('', '/hero/comic/name/');
    expect(url).toEqual('/hero/comic/name');
  });

  it('no querystring with host', () => {
    const url = urlna('http://localhost', '/hero/comic/name/');
    expect(url).toEqual('http://localhost/hero/comic/name');
  });
});
