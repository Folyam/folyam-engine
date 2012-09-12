var path = require('path');

module.exports = function(app, express) {
  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger(':method :url :status'));
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'b882b193ffb7b4d034e58364d86631e8'}));
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
  });
  
  app.configure('development', function() {
    app.use(express.errorHandler());
  });
  
  app.configure('production', function() {
    app.use(express.errorHandler()); 
  });
};