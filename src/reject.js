const filter = require('./filter')

module.exports = (collection, test, callback) => {
  return filter(collection, function(value, index, collection) {
      return !test(value, index, collection)
  }, callback)
}
