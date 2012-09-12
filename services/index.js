var env       = require('../env'),
    mongodb   = require('./mongodb');

module.exports.useModel = function(name) {
  return mongodb.useModel(name);
}