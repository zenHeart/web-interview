/**
 * 该示例说明闭包导致的内存泄漏
 */
HUGE = { a: 1 };
GIANT = { b: 1 };

function outer() {
    var x = HUGE; // huge object
    function inner() {
        var y = GIANT; // giant object :-)

        console.log(x); // usage of x cause it to be allocated to the context

        function innerF() {
            console.log(y); // usage of y causes it to be allocated to the context
        }

        function innerG() {
            console.log(1);
        }

        return innerG;
    }

    return inner();
}

var o = outer();
o(); // o will retain HUGE and GIANT.
