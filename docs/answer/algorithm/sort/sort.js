exports.bubbleSort = function bubbleSort(arr) {
    // 非数组或数组元素小于 2 直接返回
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr;
    }
    // 拷贝数组避免直接在 arr 上操作
    let sortArr = [...arr];

    // 1. 比较相邻元素
    for (let i = 0; i < sortArr.length - 1; i++) {
        // 2. 元素大的向后移动
        if (sortArr[i] > sortArr[i + 1]) {
            let temp = sortArr[i];
            sortArr[i] = sortArr[i + 1];
            sortArr[i + 1] = temp;
        }
    }
    // 3. 比较出最后一个元素外的元素
    let sortLeft = bubbleSort(sortArr.slice(0, -1));
    return [...sortLeft, ...sortArr.slice(-1)];
};
