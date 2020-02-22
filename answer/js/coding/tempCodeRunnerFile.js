const PENDING = 0;
const FULFILLED = 1;
const REJECTED = -1;

class MyPromise {
    val;
    result;
    state = PENDING;
    constructor(cb) {}
    get _isFulfilled() {
        return this.state !== 'pending';
    }

    then(onFulfilled, onRejected) {
        if (
            typeof onFulfilled !== 'function' ||
            typeof onRejected !== 'function'
        ) {
            return this;
        }
        if (this.state === 'fulfilled') {
            let res = onFulfilled(this.result);
            if (res instanceof MyPromise) {
                return res;
            } else {
                return this;
            }
        }
        if (this.state === 'rejected') {
            let res = onRejected(this.result);
            if (res instanceof MyPromise) {
                return res;
            } else {
                return this;
            }
        }
    }
    catch(onRejected) {
        onRejected();
    }
}

console.log(new MyPromise());
