/*
  Non-blocking utils functions for CPU-bound Node processes

  Node.js is (sorta) single threaded and optimized for I/O not CPU bound operations.
  For large collections and calculation intensive operations functions such as `each` or `map`
  provided by utility libraries like underscore or lodash can monopolize the CPU, blocking Node's event loop.
  Besides spawning child processes, using web workers, etc it makes sense to avoid synchronous fns.

  The async implementations of the utility functions below work similar to underscore's implementations,
  but accept a callback or return a promise alternatively:

  _.each(collection, iterator, callback)
  _.map(collection, iterator)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))

 */

const _ = {}

// Each
_.each = (collection, iterator, callback) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(collection)) {
      let i = 0
      function iter() {
        if (i < collection.length) {
          try {
            iterator(collection[i], i, collection)
          } catch(e) {
            reject(e)
          }
          i++
          setImmediate(iter)
        } else resolve();
      }
      iter();
    } else {
      let keys = Object.keys(collection)
      function iter() {
        if (keys.length > 0) {
          let key = keys.shift()
          try {
            iterator(collection[key], key, collection)
          } catch(e) {
            reject(e)
          }
          setImmediate(iter)
        } else resolve()
      }
      iter()
    }

  })
  .then(() => (callback ? callback() : null))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}

// Filter
_.filter = (collection, test, callback) => {
  var results = []
  return new Promise((resolve, reject) => {
    return _.each(collection, (element) => {
      if (test(element)) results.push(element)
    }, () => resolve(results))
  })
  .then((results) => (callback ? callback(results) : results))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}

// Map
_.map = (collection, iterator, callback) => {
  let results = []
  return new Promise((resolve, reject) => {
    if (Array.isArray(collection)) {
      let i = 0
      function iter() {
        if (i < collection.length) {
          try {
            results.push(iterator(collection[i], i, collection))
          } catch(e) {
            reject(e)
          }
          i++
          setImmediate(iter)
        } else resolve(results);
      }
      iter();
    } else {
      let keys = Object.keys(collection)
      function iter() {
        if (keys.length > 0) {
          let key = keys.shift()
          try {
            results.push(iterator(collection[key], key, collection))
          } catch(e) {
            reject(e)
          }
          setImmediate(iter)
        } else resolve(results)
      }
      iter()
    }

  })
  .then((results) => (callback ? callback(results) : results))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}

// Reduce
// arrow fn will not work for getting the right fn arguments
_.reduce = function(collection, reducer, accumulator, callback) {
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

  return _.each(collection, function(value) {
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

// Every
_.every = function(collection, iterator, callback) {
  return _
  .reduce(collection, (trueSoFar, value) => (trueSoFar && iterator(value)), true)
  .then((result) => (callback ? callback(!!result) : !!result))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}

// Some
_.some = function(collection, iterator, callback) {
  return _
  .reduce(collection, (trueSoFar, value) => (trueSoFar || iterator(value)), false)
  .then((result) => (callback ? callback(!!result) : !!result))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}

module.exports = _
