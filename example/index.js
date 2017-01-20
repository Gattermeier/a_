var async = require('../src')

var collection = { a:1, b:2, c:3 }
var cb = (result) => console.log('Each callback return')
var iterator = (el) => { console.log(el) }
async.each(collection, iterator, cb)
async.each(collection, iterator)
  .then(() => console.log('Each promise return'))
  .catch((error) => console.error(error))

var mapIterator = (el) => el * 3
cb = (result) => console.log('Map callback return', result)
async.map(collection, mapIterator, cb)
async.map(collection, mapIterator)
  .then((result) => console.log('Map promise return', result))
  .catch((error) => console.error(error))

collection = { a:1, b:2, c:3, d:'str', e:5 }
var filterTest = (value) => Number.isInteger(value)
async.filter(collection, filterTest)
  .then((result) => console.log('Filter promise return:',result))
  .catch((error) => console.error(error))
