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

experiment('# EachWhile  ', options, () => {
    test('should iterate correctly until iterator returns falsey and return key in collection with promise', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 1)

      return _.eachWhile(collection, iterator)
        .then((key) => {
          expect(key).to.equal('b');
        })
    });

    test('should iterate correctly over collection until end and return undefined with promise', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => Number.isInteger(value)

      return _.eachWhile(collection, iterator)
        .then((key) => {
          expect(key).to.equal(undefined);
        })
    });

    test('should iterate correctly until iterator returns truthy and return key in collection with callbacks', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 1)
      let cb = (key) => {
        expect(key).to.equal('b');
      }

      return _.eachWhile(collection, iterator, cb)
    });

    test('should iterate correctly over collection until end and return undefined with callback', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => Number.isInteger(value)
      let cb = (key) => {
        expect(key).to.equal(undefined);
      }
      return _.eachWhile(collection, iterator)
    });

    test('should iterate correctly until iterator returns truthy and return index of array with promise', options, () => {
      let arr = [1,2,3]
      let iterator = (value, index, arr) => (value === 1)

      return _.eachWhile(arr, iterator)
        .then((key) => {
          expect(key).to.equal(1);
        })
    });

    test('should iterate correctly over array until end and return undefined with promise', options, () => {
      let arr = [1,2,3]
      let iterator = (value, index, arr) => Number.isInteger(value)

      return _.eachWhile(arr, iterator)
        .then((key) => {
          expect(key).to.equal(undefined);
        })
    });

    test('should iterate correctly until iterator returns truthy and return index of array with callbacks', options, () => {
      let arr = [1,2,3]
      let iterator = (value, index, arr) => (value === 1)
      let cb = (key) => {
        expect(key).to.equal(1);
      }

      return _.eachWhile(arr, iterator, cb)
    });

    test('should iterate correctly over array until end and return undefined with callback', options, () => {
      let arr = [1,2,3]
      let iterator = (value, index, arr) => Number.isInteger(value)
      let cb = (key) => {
        expect(key).to.equal(undefined);
      }
      return _.eachWhile(arr, iterator)
    });
  })
