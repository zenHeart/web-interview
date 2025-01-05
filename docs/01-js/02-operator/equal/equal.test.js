/* eslint-disable eqeqeq */
const { expect } = require('chai')

describe('测试 == ', function () {
  it('test number equal string', function () {
    // eslint-disable-next-line
    expect(0 == '0').to.true
    // eslint-disable-next-line
    expect([] == 0).to.true
    // eslint-disable-next-line
    expect([] == '0').to.false
  })
})
