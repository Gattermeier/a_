var _ = require('../src')

// EACH
var collection = { a:1, b:2, c:3 }
var cb = (result) => console.log('Each callback return')
var iterator = (el, i) => { console.log(el, i) }
_.each(collection, iterator, cb)
_.each(collection, iterator)
  .then(() => console.log('Each promise return'))
  .catch((error) => console.error(error))

// MAP
var mapIterator = (el) => el * 3
cb = (result) => console.log('Map callback return', result)
_.map(collection, mapIterator, cb)
_.map(collection, mapIterator)
  .then((result) => console.log('Map promise return', result))
  .catch((error) => console.error(error))

// FILTER
collection = { a:1, b:2, c:3, d:'str', e:5 }
var filterTest = (value) => Number.isInteger(value)
_.filter(collection, filterTest)
  .then((result) => console.log('Filter promise return:',result))
  .catch((error) => console.error(error))


// REDUCE
collection = { a:1, b:2, c:3, e:5 }
const reducer = function(acc, val) {
  return acc + val
}

// case: collection, reducer, accumulator, callback
_.reduce(collection, reducer, 0, (results) => console.log('Reduce callback return', results))
// case: collection, reducer, accumulator
_.reduce(collection, reducer, 0)
  .then((results) => console.log('Reduce promise return', results))
  .catch((error) => console.error(error))
// case: collection, reducer, callback
_.reduce(collection, reducer, (results) => console.log('Reduce callback return', results))
// case: collection, reducer
_.reduce(collection, reducer)
.then((results) => console.log('Reduce promise return', results))
.catch((error) => console.error(error))


// EVERY
collection = { a:1, b:2, c:3, e:5 }
const everyIterator = (value) => Number.isInteger(value)
_.every(collection, everyIterator, (result) => console.log('Every callback return', result))

// fail
collection = { a:1, b:2, c:3, e:'str' }
_.every(collection, everyIterator)
  .then((result) => console.log('Every promise return', result))
  .catch((error) => console.error(error))

// SOME
const someIterator = everyIterator
_.some(collection, someIterator)
  .then((result) => console.log('Some promise return', result))
  .catch((error) => console.error(error))

// fail
collection = { e:'str' }
_.some(collection, someIterator, (result) => console.log('Some callback return', result))
