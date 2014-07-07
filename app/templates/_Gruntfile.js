/* Generated for <%= site_name %> */
module.exports = function (grunt) {
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //watch
    watch: {
      css: {
        files: '../src/scss/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer', 'notify:sassDone'],
        options: {
          livereload: true,
        },
      },
      js: {
        files: '../src/js/**/*.js',
        tasks: ['copy:js'],
        options: {
          livereload: true,
        },
      },
      php: {
        files: '../../**/*php',
        options: {
          livereload: true,
        },
      },
    },
    // end watch
    //sass
    sass: { // Task
      dev: { // Target
        options: { // Target options
          style: 'expanded',
          //sourcemap: true,
        },
        files: { // Dictionary of files
          '../../static/css/style.css': '../src/scss/style.scss',
        }
      },
      dist: { // Target
        options: { // Target options
          style: 'expanded',
        },
        files: { // Dictionary of files
          '../../static/css/style.css': '../src/scss/style.scss',
        }
      }
    },
    // end sass
    
    //auto prefixer
    autoprefixer: {
      options: {
        browsers: ['last 8 version', 'ie 8', 'ie 7']
      },
      // just prefix the specified file
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: '../../static/css/style.css',
        dest: '../../static/css/style.css'
      }
    },
    //end auto prefixer
    //css min
    cssmin: {
      minify: {
        expand: true,
        cwd: '../../static/css',
        src: ['*.css', '!*.min.css'],
        dest: '../../static/css',
        ext: '.css',
        report: 'gzip'
      }
    },
    // end ccs min
     
    //notify
    notify: {
      done: {
        options: {
          title: 'Done!', // optional
          message: 'Whatever you were doing is done!', //required
        }
      },
      distStart: {
        options: {
          title: ' Prepping for distribution!', // optional
          message: 'Get ready for the awesome...', //required
        }
      },
      distDone: {
        options: {
          title: "All packaged up!", // optional
          message: "<%= site_name %> is ready to be distributed ", //needed escaping!
        }
      },
      sassDone: {
        options: {
          title: ' Ta-da!!!', // optional
          message: 'Sass has compiled successfully ', //required
        }
      },
      initStart: {
        options: {
          title: 'Initializing project', // optional
          message: '...', //required
        }
      },
      initDone: {
        options: {
          title: 'Initialization done!', // optional
          message: 'Run : "grunt watch" and get to work!', //required
        }
      },
    },
    //endnotify
    //Bower copy
    bowercopy: {
      libs: {
        options: {
            destPrefix: '../../static/js'
        },
        files: {
            'modernizr.js': 'modernizr/modernizr.js',
            'jquery.js': 'jquery/jquery.js',
        }
      }
    },
    //end Bower copy
    //copy
    copy: {
      js: {
        files: [
          // includes files within path
          {expand: true, cwd: '../src/js', src: ['*.js'], dest: '../../static/js', filter: 'isFile'},
        ]
      }
    }
    //end copy
    
  }); //end grunt package configs

  //RUN ON START
  grunt.registerTask('init', ['notify:initStart', 'bowercopy', 'copy:js', 'sass:dev','notify:initDone']);

  //RUN ON COMPLETION
  grunt.registerTask('dist', ['notify:distStart', 'bowercopy', 'sass:dist', 'autoprefixer', 'cssmin', 'notify:distDone']);
  
  //DEFAULT
  grunt.registerTask('default', []);
};
