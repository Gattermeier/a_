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

experiment('# Filter over collection ', options, () => {
    test('should iterate correctly with promise', options, () => {
      let collection = [1,2,3, 'A', 'B']
      let iterator = (value, index, collection) => Number.isInteger(value)

      return _.dropWhile(collection, iterator)
        .then((result) => {
          expect(result).to.equal(['A', 'B']);
        })
    });

    test('should iterate correctly with callbacks', options, () => {
      let collection = [1,2,3, 'A', 'B']
      let iterator = (value, index, collection) => Number.isInteger(value)
      let cb = (result, err) => {
        expect(result).to.equal(['A', 'B']);
      }

      return _.dropWhile(collection, iterator, cb)
    });
  })
