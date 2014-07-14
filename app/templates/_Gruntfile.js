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
        files: '../../**/*.php',
        options: {
          livereload: true,
        },
      },
      images: {
        files: '../src/images/**/*.{png,jpg,gif,svg}',
        tasks: ['copy:images'],
        options: {
          livereload: true,
        },
      },
      fonts: {
        files: '../src/fonts/**/*',
        tasks: ['copy:fonts'],
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
          '../../static/css/ie.css': '../src/scss/ie.scss',
        }
      },
      dist: { // Target
        options: { // Target options
          style: 'expanded',
        },
        files: { // Dictionary of files
          '../../static/css/style.css': '../src/scss/style.scss',
          '../../static/css/ie.css': '../src/scss/ie.scss',
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
      },
      images: {
        files: [
          // includes files within path
          {expand: true, cwd: '../src/images', src: ['**/*.{png,jpg,gif,svg}'], dest: '../../static/images', filter: 'isFile'},
        ]
      },
      fonts: {
        files: [
          // includes files within path
          {expand: true, cwd: '../src/fonts', src: ['**/*'], dest: '../../static/fonts', filter: 'isFile'},
        ]
      }
    },
    //end copy


    //Image min
    imagemin: {                         
      dynamic: {                         
        files: [{
          expand: true,                  
          src: ['../../static/images/**/*.{png,jpg,gif}'],
          dest: '../../static/images'
        }]
      }
    },
    //end image min

    // make a zipfile
    compress: {
      production: {
        options: {
          archive: '../../production/<%= site_nameSpace %>.zip'
        },
        files: [
          { src: ['../../**/*',  '!../../dev/**', '!../../production/**'] },
        ]
      }
    }
    // end make a zipfile
    
  }); //end grunt package configs
  
  //Asset pipelines
  grunt.registerTask('prepJS',     [ 'copy:js' ]);
  grunt.registerTask('prepStyles', [ 'sass:dist', 'autoprefixer', 'cssmin' ]);
  grunt.registerTask('prepImages', [ 'copy:images', 'imagemin:dynamic' ]);
  grunt.registerTask('prepFonts',  [ 'copy:fonts' ]);

  //RUN ON START
  grunt.registerTask('init',       ['notify:initStart', 'bowercopy', 'copy:js', 'copy:images', 'sass:dev','notify:initDone']);

  //RUN FOR PRODUCTION 
  grunt.registerTask('prod',       ['notify:distStart', 'bowercopy', 'prepJS', 'prepImages', 'prepStyles', 'prepFonts', 'compress:production', 'notify:distDone']);
  
  //DEFAULT
  grunt.registerTask('default', []);
};
