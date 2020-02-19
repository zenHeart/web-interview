let sortArr = Array(100)
    .fill(1)
    .map((ele, index) => index);
let randomArr = shuffleArr(sortArr);

module.exports = {
    非数组直接返回: {
        input: 'sdf',
        expect: 'sdf'
    },
    只有一个元素: {
        input: [1],
        expect: [1]
    },
    两个元素: {
        input: [2, 1],
        expect: [1, 2]
    },
    多个乱序元素: {
        input: randomArr,
        expect: sortArr
    },
    包含重复元素: {
        input: [...randomArr, 100],
        expect: [...sortArr, 100]
    }
};

function shuffleArr(arr) {
    let originArr = arr.slice();
    let res = [];
    while (res.length < arr.length) {
        let randomIndex = ~~(Math.random() * originArr.length);
        res.push(originArr.splice(randomIndex, 1)[0]);
    }
    return res;
}
