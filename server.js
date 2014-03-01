var express = require('express')
  , http = require('http')
  , path = require('path')
  , livereload = require('connect-livereload')
  , settings = require('./settings')
  , dataloader = require('./server/dataloader')
  , clientDir = path.join(__dirname, 'client');

var app = express();

// all environments
app.use(express.favicon(path.join(clientDir + 'favicon.ico')));
app.use(express.logger('dev'));

// load liveReload script only in development mode
// load before app.router
app.configure('development', function() {
  console.log('configuring as development server');
  // live reload script (adds js snippet, but doesn't host server)
  app.use(livereload({ port: settings.liveReload.port }));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.use(app.router);
app.use(express.static(clientDir));

app.get('/api/games/:id?', dataloader('games'));
app.get('/api/locations/:id?', dataloader('locations'));
app.get('/api/pools/:id?', dataloader('pools'));
app.get('/api/teams/:id?', dataloader('teams'));
app.get('/api/players/:id?', dataloader('players'));

var server = http.createServer(app).listen(settings.webserver.port, function(){
  console.log('express server listening on port ' + settings.webserver.port);
});
