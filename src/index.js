/*
  Non-blocking utils functions for CPU-bound Node processes

  Node.js is (sorta) single threaded and optimized for I/O not CPU bound operations.
  For large collections and calculation intensive operations functions such as `each` or `map`
  provided by utility libraries like underscore or lodash can monopolize the CPU, blocking Node's event loop.
  Besides spawning child processes, using web workers, etc it makes sense to avoid synchronous fns.

  The async implementations of the utility functions below work similar to underscore's implementations,
  but accept a callback or return a promise alternatively:

  async.each(collection, iterator, callback)
  async.map(collection, iterator)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))

 */


const async = {
  each: (collection, iterator, callback) => {
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
  },
  map: (collection, iterator, callback) => {
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
}

module.exports = async
