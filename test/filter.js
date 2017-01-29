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

experiment('# Filter ', options, () => {
    test('should iterate correctly over collection with promise', options, () => {
      let collection = { a:1, b:2, c:3, d:'string' }
      let iterator = (value, index, collection) => Number.isInteger(value)

      return _.filter(collection, iterator)
        .then((result) => {
          expect(result).to.equal([1,2,3]);
        })
    });

    test('should iterate correctly over collection with callbacks', options, () => {
      let collection = { a:1, b:2, c:3, d:'string' }
      let iterator = (value, index, collection) => Number.isInteger(value)
      let cb = (result, err) => {
        expect(result).to.equal([1,2,3]);
      }

      return _.filter(collection, iterator, cb)
    });

    test('should iterate correctly over array with promise', options, () => {
      let arr = [1,2,3,'string']
      let iterator = (value, index, arr) => Number.isInteger(value)

      return _.filter(arr, iterator)
        .then((result) => {
          expect(result).to.equal([1,2,3]);
        })
    });

    test('should iterate correctly over array with callbacks', options, () => {
      let arr = [1,2,3,'string']
      let iterator = (value, index, arr) => Number.isInteger(value)
      let cb = (result, err) => {
        expect(result).to.equal([1,2,3]);
      }

      return _.filter(arr, iterator, cb)
    });
  })
