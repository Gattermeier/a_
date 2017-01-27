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

experiment('# Every over collection ', options, () => {
  test('should fail if single test fails, promise', options, () => {
    let collection = { a:1, b:2, c:3, d:'string' }
    let iterator = (value, index, collection) => Number.isInteger(value)

    return _.every(collection, iterator)
      .then((result) => {
        expect(result).to.equal(false);
      })
  });
  test('should fail if single test fails, callback', options, () => {
    let collection = { a:1, b:2, c:3, d:'string' }
    let iterator = (value, index, collection) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(false);
    }
    return _.every(collection, iterator, cb)
  });
  test('should pass if test passes for each item in collection, promise', options, () => {
    let collection = { a:1, b:2, c:3 }
    let iterator = (value, index, collection) => Number.isInteger(value)

    return _.every(collection, iterator)
      .then((result) => {
        expect(result).to.equal(true);
      })
  });
  test('should pass if test passes for each item in collection, callback', options, () => {
    let collection = { a:1, b:2, c:3 }
    let iterator = (value, index, collection) => Number.isInteger(value)
    let cb = (result, err) => {
      expect(result).to.equal(true);
    }
    return _.every(collection, iterator, cb)
  });
})
