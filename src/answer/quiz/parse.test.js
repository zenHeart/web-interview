const { parseKey, parse } = require('./parse');
const { expect } = require('chai');

describe.skip('parse test', function () {
  it('parseKey', function () {
    const testData = [
      {
        input: 'b.c',
        expect: ['b', 'c']
      },
      {
        input: '12.df[12].df.we',
        expect: ['12', 'df', '12', 'df', 'we']
      },
      {
        input: 'a_sd.c',
        expect: ['a_sd', 'c']
      },
      {
        input: 'f',
        expect: ['f']
      },
      {
        input: 'fd[1][2][3].g[3][12][6]',
        expect: ['fd', '1', '2', '3', 'g', '3', '12', '6']
      }
    ];

    testData.forEach(ele => {
      expect(parseKey(ele.input)).toEqual(ele.expect);
    });
  });
  it('parse', function () {
    const object = {
      b: { c: 4 },
      d: [{ e: 5 }, { e: 6 }]
    };
    const testData = [
      {
        input: 'b.c',
        expect: 4
      },
      {
        input: 'd[0].e',
        expect: 5
      },
      {
        input: 'd.0.e',
        expect: 5
      },
      {
        input: 'd[1].e',
        expect: 6
      },
      {
        input: 'd.1.e',
        expect: 6
      },
      {
        input: 'f',
        expect: 'undefined'
      },
      {
        input: 'f.d.f',
        expect: 'undefined'
      }
    ];

    testData.forEach(ele => {
      expect(parse(object, ele.input)).toEqual(ele.expect);
    });
  });
});
