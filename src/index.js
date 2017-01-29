
const _ = {}

_.each = _.forEach = require('./each')
_.filter = _.select = require('./filter')
_.reject = require('./reject')
_.map = _.collect = require('./map')
_.reduce = _.foldl = _.inject = require('./reduce')
_.every = _.all = require('./every')
_.some = _.any = require('./some')
_.dropWhile = require('./dropWhile')
_.eachUntil = require('./eachUntil')
_.eachWhile = require('./eachWhile')
_.find = require('./find')

module.exports = _
