const PENDING = 0;
const FULFILLED = -1;
const REJECTED = 1;

let customPromise = {
    state: PENDING,
    endVal: undefined,
    reason: undefined,
    _onFulfilledQueue: [],
    _onRejectedQueue: [],
    then(onFulfilled, onRejected) {
        // 推入执行堆栈
        this._onFulfilledQueue.push(onFulfilled);
        this._onRejectedQueue.push(onRejected);
    },
};

function deferred() {
    let call = true;

    let promise = {
        then: undefined,
    };
}
