
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , settings = require('./settings')
  , routeConfig = require('./server/route-config')
  , url = require('url')
  , autoprefixer = require('autoprefixer');


function prefixBridge(req, res, next) {
  var pathname = path.join('client', url.parse(req.url).pathname);
  if (pathname.match(/\.css/)) {
    fs.readFile(pathname, 'utf8', function(err, str){
      var compiled = autoprefixer.compile(str);
      fs.writeFile(pathname, compiled, 'utf8', next);
    });
  } else {
    next();
  }
}


var app = express();

// all environments
app.set('port', process.env.PORT || settings.webserver.port || 9000);
app.set('views', __dirname + '/server/views');
app.use(express.favicon(__dirname + '/client/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// load liveReload script only in development mode
// load before app.router
app.configure('development', function() {
  // live reload script
  var liveReloadPort = settings.liveReload.port || 35729;
  var excludeList = ['.woff', '.flv'];

  app.use(require('connect-livereload')({
    port: liveReloadPort,
    excludeList: excludeList
  }));
});

app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/client' }));
app.use(prefixBridge);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

routeConfig.configureRoutes(app);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('express server listening on port ' + app.get('port'));
});
