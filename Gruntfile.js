/*
 * grunt-wrap2000
 * https://github.com/judas-christ/grunt-wrap2000
 *
 * Copyright (c) 2014 Daniel Hägglund
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    custom_property: 'This is a',
    wrap2000: {
      wrap_strings: {
        options: {
            header: '<%= custom_property %> string header',
            footer: '<%= custom_property %> string footer'
        },
        files: [{
            expand: true,
            cwd: 'test/fixtures/',
            src: ['file*'], 
            dest: 'tmp/wrap_strings'
        }]
      },
      wrap_files: {
        options: {
          separator: '\nseparator\n',
          header: 'test/fixtures/header',
          footer: 'test/fixtures/footer'
        },
        files: [{
            expand: true,
            cwd: 'test/fixtures/',
            src: ['file*'], 
            dest: 'tmp/wrap_files'
        }]
      },
      process_function: {
        options: {
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/file(\d)/, 'f$1');
          }
        },
        files: [{
            expand: true,
            cwd: 'test/fixtures/',
            src: ['file*'], 
            dest: 'tmp/process_function'
        }]
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'wrap2000', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};