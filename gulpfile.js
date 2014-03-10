var gulp = require('gulp'),
    less = require('gulp-less'),
    when = require('bun'),
    mongoService = require('./server/mongoService');
    staticServerService = require('./server/staticServerService');
    livereloadService = require('./server/livereloadService');
    populateDBService = require('./server/populateDBService');
    q = require('q'),
    fs = require('fs'),
    autoprefixer = require('gulp-autoprefixer'),
    color = require('colors'),
    open = require('open');

var server_port = 3000,
    livereload_port = 35729,
    mongo_url = "localhost:27017/freefootie",
    builddir = '.tmp',
    datafile = 'server/sample-data.json';

var htmlSrc = 'client/**/*.html';
gulp.task('html', function(){
  return gulp.src(htmlSrc).pipe(gulp.dest(builddir));
});

var cssSrc = 'client/styles/main.less';
gulp.task('css', function(){
  var stream = when([
    gulp.src(cssSrc),
    less().on('error', function(){}),
    autoprefixer(),
    gulp.dest(builddir)]);


  stream.on('error', function(err){
    console.warn(err.message);
  });

  return stream;
});

var jsSrc = 'client/**/*.js';
gulp.task('js', function() {
  return gulp.src(jsSrc)
  .pipe(gulp.dest(builddir));
});

var staticSrc = 'client/assets/*';
gulp.task('assets', function(){
  return gulp.src(staticSrc)
  .pipe(gulp.dest(builddir));
});

gulp.task('clean', function(){
  return removeFolderService('.tmp');
});

gulp.task('init', function() {
  //This task will start the mongod DB and then load the requisite values
  return mongoService().then(function(mongo) {
    return populateDBService(mongo_url, datafile)

    .finally(function(){
      console.log('Killing mongo'.green);
      mongo.kill();
    });
  });
});

function delay(ms) {
  return function(result) {
    var deferred = q.defer();
    setTimeout(deferred.resolve.bind(deferred, result), ms);
    return deferred.promise;
  };
}

function beginWatchClient() {
  return function(notify) {
    gulp.watch(htmlSrc, ['html']).on('change', notify);
    gulp.watch(jsSrc, ['js']).on('change', notify);
    gulp.watch(cssSrc, ['css']).on('change', notify);
    gulp.watch(staticSrc, ['assets']).on('change', notify);
  };
}

var serverPath = ['server.js', 'server/*.js'];
function beginWatchServer() {
  return function(notify) {
    gulp.watch(serverPath).on('change', notify);
  };
}

function openBrowser(port) {
  return open.bind(null, 'http://localhost:' + port);
}

function waitForever() {
  return function() {
    return q.defer().promise;
  };
}

gulp.task('server', ['html', 'js', 'css', 'assets'], function(){
  //kick off a new livereload server
  return mongoService()
  .then(delay(100))
  .then(livereloadService(livereload_port))
  .then(beginWatchClient())
  .then(staticServerService({
    NODE_ENV: 'development',
    NODE_SERVER_PORT: server_port,
    NODE_LIVERELOAD_PORT:livereload_port,
    NODE_PUBLIC_DIRECTORY: builddir,
    MONGO_URL: mongo_url
  }))
  .then(delay(500))
  .then(beginWatchServer())
  .then(openBrowser(server_port))
  .then(waitForever());

});
