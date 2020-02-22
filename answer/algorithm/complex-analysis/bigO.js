/**
 * 此处演示常见的时间复杂度函数
 */

//  O(1)
function constantComplex(n) {
  // 常量复杂度不随 n 变化而变化
  console.log(n);
}

// O(logn)
function lognComplex(n, logNum = 10) {
  while (n >= logNum) {
    console.log(n);
    n /= logNum;
  }
}

// O(n)
function linearComplex(n) {
  while (n) {
    console.log(n--);
  }
}

// O(nlogn)
function nLognComplex(n, logNum = 10) {
  let temp = n;
  while (n) {
    console.log(`current ${n}`);
    lognComplex(temp, logNum);
    n--;
  }
}

// O(n^2)
function quadraticComplex(n) {
  let temp = n;
  while (n) {
    j = temp;
    while (j) {
      console.log(n, j);
      j--;
    }
    n--;
  }
}

/**
 * 采用递归实现 n!
 * TODO: 如何按递归顺序输出
 */
function factorial(n) {
  if (n < 1) {
    return console.log(n);
  }
  let temp = n;
  while (n--) {
    factorial(temp - 1);
  }
}

// 常量复杂度无论 n 为多少只输出一次
// constantComplex(10);

// logn 复杂数对数下降
// lognComplex(100);

// 线性复杂度
// linearComplex(10);

// nLogn 复杂度
// nLognComplex(8, 2);

// n^2 复杂度
// quadraticComplex(5);

// n! 复杂度
factorial(4);
