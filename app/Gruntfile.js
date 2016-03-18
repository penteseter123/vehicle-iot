'use strict';


module.exports = function(grunt) {
   grunt.initConfig({
      pkg:grunt.file.readJSON('package.json'),
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
         }
      },
      nodemon: {
         dev: {
            script: 'index.js',
            options:{
               nodeArgs:['--debug'],
               env: {
                  PORT:'5858'
               }
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-nodemon');
   grunt.registerTask('default',['nodemon']);
};
