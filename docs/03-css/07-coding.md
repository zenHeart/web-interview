# 编码题

## 如何实现页面文本不可选中，不可复制 {#p0-text-unselect}

可以通过 CSS 和 JavaScript 结合的方式实现页面文本不可选中和不可复制。

**一、使用 CSS**

可以通过设置 CSS 属性来禁止用户选中页面文本：

```css
body {
 -webkit-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
}
```

这将禁止在整个页面上进行文本选择。

**二、使用 JavaScript**

如果仅使用 CSS 不能满足需求，可以结合 JavaScript 进一步增强禁止复制的功能。以下是一个示例：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 </head>

 <body>
 <p>这是一些不可选中和不可复制的文本。</p>
 <script>
 document.addEventListener("copy", function (e) {
 e.preventDefault();
 });
 </script>
 </body>
</html>
```

在这个例子中，通过监听`copy`事件并调用`preventDefault()`方法来阻止复制操作。

## 三角形 border {#p0-border-triangle}

### CSS3实现卡片翻转?

### 常见布局实现

1. 三栏布局
2. 圣杯布局

## 参考资料

* [Front-end-Developer-Interview-Questions/css](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/css-questions/) github 仓库前端面试题
* [front-end-interview-handbook/css](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md) 上面面试题的答案

## 实现阿拉伯数字转中文 {#p0-arabic-to-chinese}

将阿拉伯数字转换成中文数字，主要考虑到以下几个转换规则：

1. **基本数字**：0-9 对应的汉字数字。
2. **单位**：十、百、千、万、亿等。
3. **规则**：数字从右到左，每 4 位一小节，小节内部和小节之间的转换规则。

 实现思路

1. 将阿拉伯数字分解成单个数字，从右到左进行处理。
2. 对每 4 位数字进行处理，即一个小节，处理完再根据小节的位置添加对应的单位（万、亿等）。
3. 处理当前小节内部的数字，并添加十、百、千的单位，注意去除连续的零，并且在必要时加入“零”字。
4. 将各个小节合并得到最终结果。

下面的 JavaScript 函数实现了阿拉伯数字到中文数字的基本转换：

```js
const number2text = (number, type = 'upper') => {
  // 配置
  const confs = {
    lower: {
      num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      unit: ['', '十', '百', '千', '万'],
      level: ['', '万', '亿']
    },
    upper: {
      num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
      unit: ['', '拾', '佰', '仟'],
      level: ['', '万', '亿']
    },
    decimal: {
      unit: ['分', '角']
    },
    maxNumber: 999999999999.99
  }

  // 过滤不合法参数
  if (Number(number) > confs.maxNumber) {
    console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`)
    return false
  }

  const conf = confs[type]
  const numbers = String(Number(number).toFixed(2)).split('.')
  const integer = numbers[0].split('')
  const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('')

  // 四位分级
  const levels = integer.reverse().reduce((pre, item, idx) => {
    const level = pre[0] && pre[0].length < 4 ? pre[0] : []
    const value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4]
    level.unshift(value)

    if (level.length === 1) {
      pre.unshift(level)
    } else {
      pre[0] = level
    }

    return pre
  }, [])

  // 整数部分
  const _integer = levels.reduce((pre, item, idx) => {
    let _level = conf.level[levels.length - idx - 1]
    let _item = item.join('').replace(/(零)\1+/g, '$1') // 连续多个零字的部分设置为单个零字

    // 如果这一级只有一个零字，则去掉这级
    if (_item === '零') {
      _item = ''
      _level = ''

      // 否则如果末尾为零字，则去掉这个零字
    } else if (_item[_item.length - 1] === '零') {
      _item = _item.slice(0, _item.length - 1)
    }

    return pre + _item + _level
  }, '')

  // 小数部分
  const _decimal = decimal
    .map((item, idx) => {
      const unit = confs.decimal.unit
      const _unit = item !== '0' ? unit[unit.length - idx - 1] : ''

      return `${conf.num[item]}${_unit}`
    })
    .join('')

  // 如果是整数，则补个整字
  return `${_integer}元` + (_decimal || '整')
}
```
