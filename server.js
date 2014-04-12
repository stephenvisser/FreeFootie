var express = require('express'),
    http = require('http'),
    path = require('path'),
    livereload = require('connect-livereload'),
    games = require('./server/api/games'),
    locations = require('./server/api/locations'),
    players = require('./server/api/players'),
    divisions = require('./server/api/divisions'),
    teams = require('./server/api/teams'),
    SERVER_PORT = 'NODE_SERVER_PORT',
    LIVERELOAD_PORT = 'NODE_LIVERELOAD_PORT',
    PUBLIC_DIRECTORY = 'NODE_PUBLIC_DIRECTORY';

if (!process.env[SERVER_PORT]) {
  console.error('Need to set the server port environment variable (run with gulp)');
  process.exit(1);
}
if (!process.env[PUBLIC_DIRECTORY]) {
  console.error('Need to set the hosting directory environment variable (run with gulp)');
  process.exit(1);
}

var app = express(),
    clientDir = path.join(__dirname, process.env[PUBLIC_DIRECTORY]);

// all environments
app.use(express.favicon(path.join(clientDir, 'favicon.ico')));
app.use(express.logger('dev'));

// load liveReload script only in development mode
app.configure('development', function() {
  console.log('configuring as development server');
  // live reload script (adds js snippet, but doesn't host server)
  if (process.env[LIVERELOAD_PORT]) app.use(livereload({ port: process.env[LIVERELOAD_PORT] }));

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(clientDir));

app.get('/api/games/:id?', games.get);
app.post('/api/games', games.save);

app.get('/api/locations/:id?', locations.get);
app.post('/api/locations', locations.save);

app.get('/api/divisions/:id?', divisions.get);
app.post('/api/divisions', divisions.save);

app.get('/api/teams/:id?', teams.get);
app.post('/api/teams', teams.save);

app.get('/api/players/:id?', players.get);
app.post('/api/players', players.save);

var server = http.createServer(app).listen(process.env[SERVER_PORT], function(){
  console.log('Express server listening on port ' + process.env[SERVER_PORT]);
});
