/**
    经过严密的计算，小赛买了一支股票，他知道从他买股票的那天开始，股票会有以下变化：第一天不变，以后涨一天，跌一天，涨两天，跌一天，涨三天，跌一天...依此类推。
    为方便计算，假设每次涨和跌皆为1，股票初始单价也为1，请计算买股票的第n天每股股票值多少钱？

 * @param {number}
 */
const INIT_VALUE = 1
const INCREASE_VALUE = 1
const DECREASE_VALUE = -1

function getTokenVal (d) {
  let res = INIT_VALUE
  let initIncreaseDay = 1
  let increaseDay = initIncreaseDay
  let i = 1
  while (i < d) {
    if (increaseDay) {
      res += INCREASE_VALUE
      i++
      increaseDay--
    } else {
      res += DECREASE_VALUE
      i++
      ++initIncreaseDay
      increaseDay = initIncreaseDay
    }
  }
  return res
}
console.log(getTokenVal(1))
console.log(getTokenVal(2))
console.log(getTokenVal(3))
console.log(getTokenVal(4))
console.log(getTokenVal(5))
console.log(getTokenVal(6))
console.log(getTokenVal(7))
console.log(getTokenVal(8))
console.log(getTokenVal(9))
console.log(getTokenVal(10))
console.log(getTokenVal(11))
console.log(getTokenVal(12))
