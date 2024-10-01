const SetOps = require('./SetOps');
const { expect } = require('chai');

const setOps = new SetOps();
let testData = [];
describe.skip('SetOps 集合类', function () {
  it('union', function () {
    testData = [
      {
        input: {
          a: [1, 2],
          b: [3, 4]
        },
        expect: [1, 2, 3, 4]
      }
    ];

    testData.forEach((ele) => {
      expect(setOps.union(ele.input.a, ele.input.b)).toEqual(ele.expect);
    });
  });
  it('intersection', function () {
    testData = [
      {
        input: {
          a: [1, 2],
          b: [3, 4]
        },
        expect: []
      },
      {
        input: {
          a: [1, 2, 3],
          b: [3, 4]
        },
        expect: [3]
      }
    ];

    testData.forEach((ele) => {
      expect(setOps.intersection(ele.input.a, ele.input.b)).toEqual(ele.expect);
    });
  });
  it('complements', function () {
    testData = [
      {
        input: {
          a: [1, 2],
          b: [3, 4]
        },
        expect: [1, 2]
      },
      {
        input: {
          a: [1, 2, 3],
          b: [3, 4]
        },
        expect: [1, 2]
      }
    ];

    testData.forEach((ele) => {
      expect(setOps.complements(ele.input.a, ele.input.b)).toEqual(ele.expect);
    });
  });
  it('symmetricDifference', function () {
    testData = [
      {
        input: {
          a: [1, 2],
          b: [3, 4]
        },
        expect: [1, 2, 3, 4]
      },
      {
        input: {
          a: [1, 2, 3],
          b: [3, 4]
        },
        expect: [1, 2, 4]
      }
    ];

    testData.forEach((ele) => {
      expect(setOps.symmetricDifference(ele.input.a, ele.input.b)).toEqual(ele.expect);
    });
  });
});
