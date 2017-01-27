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

experiment.only('# EachUntil over collection ', options, () => {
    test('should iterate correctly until iterator returns truthy and return key in collection with promise', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 2)

      return _.eachUntil(collection, iterator)
        .then((key) => {
          expect(key).to.equal('b');
        })
    });
    
    test('should iterate correctly over collection until end and return undefined with promise', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 4)

      return _.eachUntil(collection, iterator)
        .then((key) => {
          expect(key).to.equal(undefined);
        })
    });

    test('should iterate correctly until iterator returns truthy and return key in collection with callbacks', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 3)
      let cb = (key) => {
        expect(key).to.equal('c');
      }

      return _.each(collection, iterator, cb)
    });

    test('should iterate correctly over collection until end and return undefined with callback', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (value === 4)
      let cb = (key) => {
        expect(key).to.equal(undefined);
      }
      return _.eachUntil(collection, iterator)
    });
  })
