const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const experiment = lab.experiment;
const test = lab.test;
const it = lab.it;
const before = lab.before;
const after = lab.after;

const expect = Code.expect;

const _ = require('../src/index');

const options = { parallel: true }

experiment('# Every # ', options, () => {
  test('should fail if single test fails in collection, return promise', options, () => {
    let collection = { a:1, b:2, c:3, d:'string' }
    let iterator = (value, index, collection) => Number.isInteger(value)

    return _.every(collection, iterator)
      .then((result) => {
        expect(result).to.equal(false);
      })
  });
  test('should fail if single test fails in collection, return callback', options, () => {
    let collection = { a:1, b:2, c:3, d:'string' }
    let iterator = (value, index, collection) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(false);
    }
    return _.every(collection, iterator, cb)
  });
  test('should pass if test passes for each item in collection, return promise', options, () => {
    let collection = { a:1, b:2, c:3 }
    let iterator = (value, index, collection) => Number.isInteger(value)

    return _.every(collection, iterator)
      .then((result) => {
        expect(result).to.equal(true);
      })
  });
  test('should pass if test passes for each item in collection, return callback', options, () => {
    let collection = { a:1, b:2, c:3 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(true);
    }
    return _.every(collection, iterator, cb)
  });



  test('should fail if single test fails in array, return promise', options, () => {
    let arr = [1,2,3,'string']
    let iterator = (value, index, arr) => Number.isInteger(value)

    return _.every(arr, iterator)
      .then((result) => {
        expect(result).to.equal(false);
      })
  });
  test('should fail if single test fails in array, return callback', options, () => {
    let arr = [1,2,3,'string']
    let iterator = (value, index, arr) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(false);
    }
    return _.every(arr, iterator, cb)
  });
  test('should pass if test passes for each item in array, return promise', options, () => {
    let arr = [1,2,3]
    let iterator = (value, index, arr) => Number.isInteger(value)

    return _.every(arr, iterator)
      .then((result) => {
        expect(result).to.equal(true);
      })
  });
  test('should pass if test passes for each item in array, return callback', options, () => {
    let arr = [1,2,3]
    let iterator = (value, index, arr) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(true);
    }
    return _.every(arr, iterator, cb)
  });
})
