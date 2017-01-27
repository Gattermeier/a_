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

experiment('# Map over collection ', options, () => {
    test('should iterate correctly with promise', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => value * 2

      return _.map(collection, iterator)
        .then((result) => {
          expect(result).to.equal([2,4,6]);
        })
    });

    test('should iterate correctly with callbacks', options, () => {
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => value * 2
      let cb = (result, err) => {
        expect(result).to.equal([2,4,6]);
      }

      return _.map(collection, iterator, cb)
    });
  })
