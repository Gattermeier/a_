# Non-blocking utils functions for CPU-bound Node processes

Node.js is (sorta) single threaded and optimized for I/O not CPU bound operations.    
For large collections and calculation intensive operations functions such as `each` or `map`    
provided by utility libraries like underscore or lodash can monopolize the CPU, blocking Node's event loop.    
Besides spawning child processes, using web workers, etc it makes sense to avoid synchronous fns.    

The _ implementations here work similar to underscore's implementations,    
but accept a callback or return a promise alternatively:

### Each
```javascript
_.each(collection, iterator, callback)
_.each(collection, iterator)
_.filter(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

### Map
```javascript
_.map(collection, iterator, callback)
_.map(collection, iterator)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

### Filter
```javascript
_.filter(collection, test, callback)
_.filter(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

### Reduce
```javascript
_.reduce(collection, reducer, accumulator, callback)
_.reduce(collection, reducer, callback)
_.reduce(collection, reducer, accumulator)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
_.reduce(collection, reducer)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

### Every
```javascript
_.every(collection, test, callback)
_.every(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

### Some
```javascript
_.some(collection, test, callback)
_.some(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```
