var mongoose    = require('mongoose'),
    environment = require('../env');

function connectionTest() {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return true
  } else {
    mongoose.connect(environment.mongo.url);
    return true;
  }
}

module.exports.useModel = function(name) {
  connectionTest();
  return require("../models/" + name)(mongoose);
}