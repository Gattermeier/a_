const each = require('./each')

module.exports = (collection, test, callback) => {
  var results = []
  return new Promise((resolve, reject) => {
    return each(collection, (element) => {
      if (test(element)) results.push(element)
    }, () => resolve(results))
  })
  .then((results) => (callback ? callback(results) : results))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}
