
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');

var app = express();

require('./configuration')(app, express);

routes = require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + ' in ' + app.settings.env + ' mode');
});
