# Non-blocking utils functions for CPU-bound Node processes

Node.js is (sorta) single threaded and optimized for I/O not CPU bound operations.    
For large collections and calculation intensive operations functions such as `each` or `map`    
provided by utility libraries like underscore or lodash can monopolize the CPU, blocking Node's event loop.    
Besides spawning child processes, using web workers, etc it makes sense to avoid synchronous fns.    

The async implementations here work similar to underscore's implementations,    
but accept a callback or return a promise alternatively:

```(javascript)
async.each(collection, iterator, callback)
async.map(collection, iterator)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```
