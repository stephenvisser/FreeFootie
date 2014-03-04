var gulp = require('gulp'),
    less = require('gulp-less'),
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
  return gulp.src(cssSrc)
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(gulp.dest(builddir));
});

var jsSrc = 'client/**/*.js';
gulp.task('js', function() {
  return gulp.src(jsSrc)
  .pipe(gulp.dest(builddir));
});

var staticSrc = ['client/favicon.ico', 'client/apple-touch-icon.png'];
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

gulp.task('server', ['html', 'js', 'css', 'assets'], function(){
  //kick off a new livereload server
  return mongoService()

  .then(function(mongo){
    return livereloadService(livereload_port)

    .then(function(notify) {
      gulp.watch(htmlSrc, ['html']).on('change', notify);
      gulp.watch(jsSrc, ['js']).on('change', notify);
      gulp.watch(cssSrc, ['css']).on('change', notify);
      gulp.watch(staticSrc, ['assets']).on('change', notify);

      return staticServerService({
        NODE_ENV: 'development',
        NODE_SERVER_PORT: server_port,
        NODE_LIVERELOAD_PORT:livereload_port,
        NODE_PUBLIC_DIRECTORY: builddir,
        MONGO_URL: mongo_url
      }).then(function(nodemon){
        gulp.watch(['server.js', 'server/*.js'], function(){
          nodemon.restart();
        });
      });
    })

    .then(function(){
      open('http://localhost:' + server_port);
      //Return a promise that is never fulfilled
      return q.defer().promise;
    })

    .finally(function(){
      console.log('Killing mongo'.green);
      mongo.kill();
    });
  });
});
