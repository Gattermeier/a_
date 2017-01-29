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

experiment('# Reduce ', options, () => {
  test('should reduce over collection correctly using promise with accumulator passed', options, () => {
    let collection = { a: 1, b: 2, c: 3, d: 4 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val

    return _.reduce(collection, reducer, 1)
      .then((result) => {
        expect(result).to.equal(11);
      })
  });
  test('should reduce over collection correctly using promise without accumulator passed', options, () => {
    let collection = { a: 1, b: 2, c: 3, d: 4 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val

    return _.reduce(collection, reducer)
      .then((result) => {
        expect(result).to.equal(10);
      })
  });
  test('should reduce over collection correctly using callback with accumulator passed', options, () => {
    let collection = { a: 1, b: 2, c: 3, d: 4 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val
    let cb = (result, err) => {
      expect(result).to.equal(11);
    }
    return _.reduce(collection, reducer, 1, cb)
  });
  test('should reduce over collection correctly using promise without accumulator passed', options, () => {
    let collection = { a: 1, b: 2, c: 3, d: 4 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val
    let cb = (result, err) => {
      expect(result).to.equal(10);
    }
    return _.reduce(collection, reducer, cb)
  });
  test('should reduce over array correctly using promise with accumulator passed', options, () => {
    let arr = [1,2,3,4]
    let iterator = (value, index, arr) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val

    return _.reduce(arr, reducer, 1)
      .then((result) => {
        expect(result).to.equal(11);
      })
  });
  test('should reduce over array correctly using promise without accumulator passed', options, () => {
    let arr = [1,2,3,4]
    let iterator = (value, index, arr) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val

    return _.reduce(arr, reducer)
      .then((result) => {
        expect(result).to.equal(10);
      })
  });
  test('should reduce over array correctly using callback with accumulator passed', options, () => {
    let arr = [1,2,3,4]
    let iterator = (value, index, arr) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val
    let cb = (result, err) => {
      expect(result).to.equal(11);
    }
    return _.reduce(arr, reducer, 1, cb)
  });
  test('should reduce over array correctly using promise without accumulator passed', options, () => {
    let arr = [1,2,3,4]
    let iterator = (value, index, arr) => Number.isInteger(value)
    const reducer = (acc, val) => acc + val
    let cb = (result, err) => {
      expect(result).to.equal(10);
    }
    return _.reduce(arr, reducer, cb)
  });
})
