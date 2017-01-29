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

experiment('# Each # ', options, () => {
    test('should iterate correctly over collection with promise', options, () => {
      let result = 0
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (result += value )

      return _.each(collection, iterator)
        .then(() => {
          expect(result).to.equal(6);
        })
    });

    test('should iterate correctly over collection with callbacks', options, () => {
      let result = 0
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (result += value )
      let cb = (data) => {
        expect(result).to.equal(6);
      }

      return _.each(collection, iterator, cb)
    });

    test('should iterate correctly over array with promise', options, () => {
      let result = 0
      let arr = [1,2,3]
      let iterator = (value, index, arr) => (result += value )

      return _.each(arr, iterator)
        .then(() => {
          expect(result).to.equal(6);
        })
    });

    test('should iterate correctly over array with callbacks', options, () => {
      let result = 0
      let arr = [1,2,3]
      let iterator = (value, index, arr) => (result += value )
      let cb = (data) => {
        expect(result).to.equal(6);
      }

      return _.each(arr, iterator, cb)
    });
  })
