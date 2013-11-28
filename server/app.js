/**
 * Module dependencies.
 */

var express = require('express')
  , route = require('express-enrouten')
  , http = require('http')
  , livereload = require('connect-livereload')
  , path = require('path');

var app = express();

// development only
if ('development' == app.get('env')) {
  app.use(livereload(
    {
      port: 35729,
      excludeList: ['.woff', '.flv']
    }
  ));

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}
// all environments
app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'dist')));

//Use Enrouten to configure all the paths
route(app).withRoutes({
  directory: 'controllers'
});


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('express server listening on port ' + app.get('port'));
});
