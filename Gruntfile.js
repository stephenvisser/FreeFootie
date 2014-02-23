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
              files: ['client/styles/*', 'server/routes/**/*']
            },
            app: {
              files: ['client/javascripts/**']
            },
            views: {
                files:['server/views/*', 'server/static/*', 'client/app/**/*']
            },
            serverjs: {
              files: ['server/**', 'test/server/**/*-tests.js'],
              tasks: ['servertests']                
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    ignoredFiles: ['client/**/*'],
                    env: {
                        PORT: port
                    }
                }
            }
        },
        nodeunit: {
            all: ['test/server/**/*-tests.js']
        },
	    open: {
            all: {
                path: 'http://localhost:' + port
            }
	    },
	    concurrent: {
            target: {
                tasks: ['nodemon', 'watch', 'delayOpen'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

     //delay opening browser - usually opens before server running
      grunt.registerTask('delayOpen', 'delay open', function(){
        var done = this.async();
        setTimeout(function(){
            grunt.task.run('open');
            done();
        }, 1000);
      });

    grunt.registerTask('server', ['concurrent']);
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('servertests', ['nodeunit:all']);
};
