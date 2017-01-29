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

experiment('# Find # ', options, () => {
    test('should iterate correctly over collection with promise and return key', options, () => {
      let collection = { a: 'string', b:2, c: 'sting' }
      let iterator = (value, index, collection) => Number.isInteger(value)

      return _.find(collection, iterator)
        .then((result) => {
          expect(result).to.equal(2);
        })
    });

    test('should return undefined if never truthy, return as promise', options, () => {
      let collection = { a: 'string', c: 'sting' }
      let iterator = (value, index, collection) => Number.isInteger(value)

      return _.find(collection, iterator)
        .then((result) => {
          expect(result).to.equal(undefined);
        })
    });

    test('should iterate correctly over collection and return key via callback', options, () => {
      let collection = { a: 'string', b:2, c: 'sting' }
      let iterator = (value, index, collection) => Number.isInteger(value)
      let cb = (result) => {
        expect(result).to.equal(2);
      }

      return _.find(collection, iterator, cb)
    });

    test('should iterate correctly over array and return index via promise', options, () => {
      let arr = ['string',2,'string']
      let iterator = (value, index, arr) => Number.isInteger(value)

      return _.find(arr, iterator)
        .then((result) => {
          expect(result).to.equal(2);
        })
    });

    test('should iterate correctly over array and return index via callback', options, () => {
      let arr = ['string',2,'string']
      let iterator = (value, index, arr) => Number.isInteger(value)
      let cb = (result) => {
        expect(result).to.equal(2);
      }

      return _.find(arr, iterator, cb)
    });
  })
