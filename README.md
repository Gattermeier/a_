# Non-blocking utils functions for CPU-bound Node processes
[![Build Status](https://travis-ci.org/Gattermeier/a_.svg?branch=master)](https://travis-ci.org/Gattermeier/a_)

Node.js is (sorta) single threaded and optimized for I/O not CPU bound operations.    
For large collections and calculation intensive operations functions such as `each` or `map`    
provided by utility libraries like underscore or lodash can monopolize the CPU, blocking Node's event loop.    
Besides spawning child processes, using web workers, etc it makes sense to avoid synchronous fns.    

## Usage

Install with npm: `npm i -S a_`   
Run unit tests with: `npm test`   
Use in your project:    
```javascript
import _ from 'a_'
// or
const _ = require('a_')
```

## Available Functions

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

### Reject
```javascript
_.reject(collection, test, callback)
_.reject(collection, test)
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

### DropWhile
Returns a slice of array excluding elements dropped from the beginning.     
Elements are dropped until test returns falsey    
```javascript
_.some(collection, test, callback)
_.some(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

## EachUntil
Iterates over collection until iterator first returns truthy, returns index or key for value for which iterator returned truthy.    
```javascript
_.eachUntil(collection, test, callback)
_.eachUntil(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

## EachWhile
Iterates over collection until iterator first returns falsy, returns index or key for value for which iterator returned falsy.    
```javascript
_.eachWhile(collection, test, callback)
_.eachWhile(collection, test)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
