const reduce = require('./reduce')

module.exports = (collection, test, callback) => {
  if (!Array.isArray(collection)) throw new Error('dropWhile expects Array')

  return reduce(collection, (acc, value) => {
    return test(value) && acc[0] ? [true, acc[1].slice(1)] : [false, acc[1]]
  }, [ true, collection])
  .then((results) => (callback ? callback(results[1]) : results[1]))
  .catch((error) => {
    if (callback) return callback(error)
    throw error
  })
}
