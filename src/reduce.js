const each = require('./each')

module.exports = function(collection, reducer, accumulator, callback) {
  var args = [...arguments];
  var initialize = false

  // case: insufficient arguments
  if (args.length < 2) {
    throw new Error('reduce requires at the minimum 2 arguments: collection and a reducer function')
  }

  // no accumulator nor callback
  if (args.length === 2) initialize = true

  // 3 arguments, and 3rd is a function (the callback)
  if ((args.length < 4) && (typeof args[2] === 'function')) {
    initialize = true
    callback = args[2]
  }

  // handled by defaults:
  // 3 arguments, and 3rd is not a function (the accumulator)
  // 4 arguments, both accumulator and callback

  return each(collection, function(value) {
    if (initialize) {
      accumulator = value
      initialize = false
    } else {
      accumulator = reducer(accumulator, value)
    }
  })
  .then(() => (callback ? callback(accumulator) : accumulator))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}
