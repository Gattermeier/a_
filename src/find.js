const eachUntil = require('./eachUntil')

module.exports = function(collection, iterator, callback) {
  return eachUntil(collection, iterator)
    .then((key) => key ? collection[key] : undefined)
    .then((result) => callback ? callback(result) : result)
}
