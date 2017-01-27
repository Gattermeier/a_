module.exports = (collection, iterator, callback) => {
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
