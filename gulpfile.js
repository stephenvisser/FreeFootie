var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload')
    less = require('gulp-less'),
    rm = require('rimraf'),
    q = require('q'),
    autoprefixer = require('gulp-autoprefixer'),
    open = require('open');

var server_port = 3000,
    livereload_port = 35729,
    builddir = '.tmp';

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

gulp.task('clean', function(){
  var later = q.defer();
  rm('.tmp', function(err){
    if (err) {
      later.reject(err);
    } else {
      later.resolve();
    }
  });
  return later.promise;
});

gulp.task('server', ['html', 'js', 'css'], function(){
  //kick off a new livereload server
  var server = livereload(livereload_port);

  function notify(file) {
    server.changed(file.path);
  }

  livereload.servers[livereload_port].server.on('listening', function(){
    //The livereload server is up and running, we can watch for changes
    gulp.watch(htmlSrc, ['html']).on('change', notify);
    gulp.watch(jsSrc, ['js']).on('change', notify);
    gulp.watch(cssSrc, ['css']).on('change', notify);
  });

  nodemon({
    script: 'server.js',
    //We don't want nodemon to watch all js files; whitelist 'server'
    watch: ['server', 'server.js'],
    env: {
      NODE_ENV: 'development',
      NODE_SERVER_PORT: server_port,
      NODE_LIVERELOAD_PORT:livereload_port,
      NODE_PUBLIC_DIRECTORY: builddir
    }
  })
  .on('stdout', function(out){
    if (String.fromCharCode.apply(null, new Uint16Array(out)).indexOf(server_port) != -1) {
      //Since the 'start' nodemon event isn't emitted when the server STARTS,
      //we use a very fragile listener that depends on stdout format
      open('http://localhost:' + server_port);
    }
  });
});
