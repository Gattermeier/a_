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

experiment('# Each over collection ', options, () => {
    test('should iterate correctly with promise', options, () => {
      let result = 0
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (result += value )

      return _.each(collection, iterator)
        .then(() => {
          expect(result).to.equal(6);
        })
    });

    test('should iterate correctly with callbacks', options, () => {
      let result = 0
      let collection = { a:1, b:2, c:3 }
      let iterator = (value, index, collection) => (result += value )
      let cb = (data) => {
        expect(result).to.equal(6);
      }

      return _.each(collection, iterator, cb)
    });
  })
