// iterate over collection until iterator returns truthy

module.exports = (collection, iterator, callback) => {
  return new Promise((resolve, reject) => {
    let until = false
    if (Array.isArray(collection)) {
      let i = 0
      function iter() {
        if (i < collection.length && !until) {
          try {
            until = !!iterator(collection[i], i, collection)
          } catch(e) {
            reject(e)
          }
          i++
          setImmediate(iter)
        } else resolve(i || undefined);
      }
      iter();
    } else {
      let keys = Object.keys(collection)
      let key = null
      function iter() {
        if (keys.length > 0 && !until) {
          key = keys.shift()
          try {
            until = !!iterator(collection[key], key, collection)
          } catch(e) {
            reject(e)
          }
          setImmediate(iter)
        } else {
          console.log('until', until, key, key|| undefined)
          resolve(key || undefined)
        }
      }
      iter()
    }

  })
  .then((key) => (callback ? callback(key) : key))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}
