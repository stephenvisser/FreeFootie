module.exports = function(grunt){

    var settings = require('./settings');

    var port = settings.webserver.port || 9000;

	grunt.loadNpmTasks('grunt-karma');

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
      },
      unit: {
        singleRun: false,
        browsers: ['Chrome'],
        autoWatch: true
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
		},
		watch: {
            options: {
              // Start a live reload server on the default port 35729
              livereload: settings.liveReload.port || 35729
            },
            css: {
              files: ['client/stylesheets/*', 'server/routes/**/*']
            },
            app: {
              files: ['client/javascripts/**']
            },
            views: {
                files:['server/views/*', 'server/static/*', 'client/app/**/*']
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    ignoredFiles: ['client/**/*'],
                    env: {
                        PORT: port
                    }
                }
            }
        },
	    open: {
            all: {
                path: 'http://localhost:' + port
            }
	    },
	    concurrent: {
            target: {
                tasks: ['nodemon', 'watch', 'open'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('server', ['concurrent']);
    grunt.registerTask('test', ['karma:unit']);
};
