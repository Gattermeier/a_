var async = require('../src')

var collection = { a:1, b:2, c:3 }
var cb = (result) => console.log('finished', result)

var iterator = (el) => { console.log(el) }
async.each(collection, iterator, cb)

var iterator2 = (el) => el*3
async.map(collection, iterator2, cb)
async.map(collection, iterator2)
  .then((result) => console.log(result))
