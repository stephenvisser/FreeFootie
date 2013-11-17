module.exports = function(config){

  config.set(
    {  
      basePath : '',
      preprocessors: {
        'client/app/**/*.js': 'coverage'
      },
      frameworks : ["jasmine"],
      files : [
        'client/vendor/angular/angular.js',
        'client/vendor/angular/angular-resource.js',
        'client/vendor/angular/angular-route.js',
        'client/vendor/angular/angular-mocks.js',
        'client/vendor/angular/angular-scenario.js',
        'client/app/app.js',
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
     
      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      //browsers: ['Chrome'],
     
      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 7000,
     
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
