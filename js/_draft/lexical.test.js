const {expect} = require ('chai');

describe ('变量名', function () {
  it ('允许可见的 UTF 8 字符', function () {
    let π = 3.14;
    let 派 = 3.14;
    expect (π).to.equal (3.14);
    expect (派).to.equal (3.14);
  });
});

describe ('词法分析', function () {
  it ('验证自动分号填充功能', function () {
    /** 
		 * 由于 f 后包含 () 会自动和上一句合并为 f(x+y)
		 * 导致抛出 typeError 错误,此示例出自权威指南 第六版  2.5 章节
		 * */

    let func = () => {
      let x = (y = f = 1);
      y = x + f (x + y).toString ();
    };

    expect (func).throw (/.*f.*not.*function/);
  });
  it ('验证 ++ 符号的结合', function () {
    /** 
		 * ++ 自动与后一个变量结合,导致 y = 1,x=0
		 * */

    let x = (y = 0);
    x;
    ++y;

    expect (x).to.equal (0);
    expect (y).to.equal (1);
  });
});
