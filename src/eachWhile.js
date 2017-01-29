const eachUntil = require('./eachUntil')

module.exports = (collection, test, callback) => {
  return eachUntil(collection, function(value, index, collection) {
      return !test(value, index, collection)
  }, callback)
}
