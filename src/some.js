const reduce = require('./reduce')

module.exports = function(collection, iterator, callback) {
  return reduce(collection, (trueSoFar, value) => (trueSoFar || iterator(value)), false)
    .then((result) => (callback ? callback(!!result) : !!result))
    .catch((error) => {
      if (callback) return callback(error)
      throw error
    })
}
