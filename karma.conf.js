module.exports = function(config){

  config.set(
    {  
      basePath : '',
      preprocessors: {
        'client/app/scripts/**/*.js': 'coverage'
      },
      frameworks : ["jasmine"],
      files : [
        'client/bower_components/angular/angular.js',
        'client/bower_components/angular-resource/angular-resource.js',
        'client/bower_components/angular-route/angular-route.js',
        'client/bower_components/angular-mocks/angular-mocks.js',
        'client/bower_components/angular-google-maps/src/angular-google-maps.js',
        'client/app/**/*.js',
        'test/**/*.js'
      ],
      exclude : [],
      reporters: ['progress', 'coverage'],
     
      // web server port
      port: 9876,
     
      // cli runner port
      runnerPort: 9100,
     
      // enable / disable colors in the output (reporters and logs)
      colors: true,
     
      // level of logging
      // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
      logLevel: 'LOG_INFO',
     
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
     
      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: ['Chrome'],
     
      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 5000,
     
      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false,
     
      coverageReporter: {
        type: 'html',
        dir: 'coverage/'
      }
    }
  );
};
