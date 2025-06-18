function runMiddleware (data, middleware, cb) {
  if (middleware.length === 0) {
    return cb(data)
  }
  let i = 0
  function next () {
    if (i >= middleware.length) {
      return cb(data)
    }
    const fn = middleware[i++]
    fn(data, next)
  }
  next()
}

exports.runMiddleware = runMiddleware
