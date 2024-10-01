const { expect } = require('chai');

describe('undefined null', function () {
  describe('undefined', function () {
    it('undefined 运算转变为 NaN', function () {
      expect(undefined + 1).to.NaN;
      expect(undefined + 1).to.NaN;
      expect(undefined - 1).to.NaN;
      expect(undefined / 1).to.NaN;
    });
  });

  describe('null', function () {
    it('null 运算转变为 0', function () {
      expect(null + 1).to.eq(1);
      expect(null * 1).to.eq(0);
      expect(null - 1).to.eq(-1);
      expect(null / 1).to.eq(0);
    });
  });
});
