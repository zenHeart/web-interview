
重点是理解 js 数值采用采用 **IEEE 754 编码**表示数值,,产生原因是二级制表示浮点时某些浮点只能取近似值导致,存在编码误差

> 所以在做金融相关计算时,多采用最小货币价值对应的整数来处理计算,例如人命币采用分或者厘为单位,利用整数计算

推荐视频 [watch](https://www.youtube.com/watch?v=wPBjd-vb9eI)

- [表示 ieee754](https://www.youtube.com/watch?v=8afbTaA-gOQ)

1. **NaN** 表示非法数字,利用 `NaN !=== NaN` 的特性判断
2. **Infinity** 正无穷
3. **-Infinity** 负无穷
    > 注意 Number 类型上包含一系列常量,利用`Object.getOwnPropertyDescriptors(Number)` 自行查看

- `toString` 转换为对应进制的字符串
- 根据前缀自动判断进制
  - **0x** 开头 16 进制
  - **0** 开头 8 进制

整数的加法运算符?
