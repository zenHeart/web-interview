/**
 * 该示例说明闭包导致的内存泄漏
 */
const HUGE = { a: 1 }
const GIANT = { b: 1 }

function outer () {
  const x = HUGE // huge object
  function inner () {
    const y = GIANT // giant object :-)

    console.log(x) // usage of x cause it to be allocated to the context
    // eslint-disable-next-line
    function innerF () {
      console.log(y) // usage of y causes it to be allocated to the context
    }

    function innerG () {
      console.log(1)
    }

    return innerG
  }

  return inner()
}

const o = outer()
o() // o will retain HUGE and GIANT.
