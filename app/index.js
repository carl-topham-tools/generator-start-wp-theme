'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var StartWPSiteGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  
    this.on('end', function () {
      process.chdir(this.themeNameSpace+"/dev/tasks");

      var that = this;
      if (!this.options['skip-install']) {
        this.installDependencies(function () {
            console.log('Everything is ready!');
            //Init the project with Grunt to move the last files into place
            that.spawnCommand('grunt', ['init']);

        });
        
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    this.log(chalk.magenta('You\'re using the fantastic Start Wordpress theme generator.'));

    var prompts = [


    {
      name: 'themeName',
      message: 'What do you want to call your theme?',
      default: function( answers ) {
        return 'New Theme'
      }
    
    }


    ,{
    name: 'themeNameSpace',
    message: 'Unique name-space for the project (alphanumeric)?',
    default: function( answers ) {
        return answers.themeName.replace(/\W/g, '').toLowerCase();
      }
    }


  ,{
    name: 'themeAuthor',
    message: 'Name of the themes author?',
    default: function( answers ) {
    return 'John Doe';
    }
  }


  ,{
    name: 'themeAuthorURI',
    message: 'Website of the themes authors?',
    default: function( answers ) {
    return 'http://'+answers.themeAuthor.replace(/\W/g, '').toLowerCase()+'.com';
    }
  }


  ,{
    name: 'themeURI',
    message: 'Website of the theme?',
    default: function( answers ) {
      return answers.themeAuthorURI+'/'+answers.themeNameSpace;
    }
  }

  ,{
    type: 'checkbox',
    name: 'themeTags',
    message: 'Theme tags ( more available on wordpress.org )?',
    choices: ['dark','light','left-sidebar','right-sidebar','fixed-layout','fluid-layout','responsive-layout']
  }

  ,{
    name: 'themeDescription',
    message: 'Description of the theme?',
    default: function( answers ) {
    return 'This is a description for the '+answers.themeName+' theme.';
  }
  }


    ];//end prompts
    
    this.prompt(prompts, function (props) {
      this.themeName = props.themeName;
      this.themeNameSpace = props.themeNameSpace;
      this.themeAuthor = props.themeAuthor;
      this.themeAuthorURI = props.themeAuthorURI;
      this.themeURI = props.themeURI;
      this.themeTags = props.themeTags;
      this.themeDescription = props.themeDescription;
      this.jshintTag = '<%= jshint.all %>';

      done();
    }.bind(this));
  },

  app: function () {
    var context = { 
        
        themeName: this.themeName,
        themeAuthor : this.themeAuthor,
        themeAuthorURI : this.themeAuthorURI,
        themeURI : this.themeURI,
        themeTags : this.themeTags,
        themeDescription : this.themeDescription,

        site_name: this.themeName,
        site_nameSpace: this.themeNameSpace,

    };

    //make site folder
    this.mkdir(this.themeNameSpace);


    //Copy the base theme over
    this.directory('blank-theme', this.themeNameSpace);


  
    //make folders for the content
    //this.mkdir(this.themeNameSpace+'/dist'); //created at runtime
    this.mkdir(this.themeNameSpace+'/dev');
    this.mkdir(this.themeNameSpace+'/dev/src');
    this.mkdir(this.themeNameSpace+'/dev/src/fonts');

    //make folder for the task runners
    this.mkdir(this.themeNameSpace+'/dev/tasks');

    //make the static content
    this.mkdir(this.themeNameSpace+'/static');
    this.mkdir(this.themeNameSpace+'/static/fonts');
    this.mkdir(this.themeNameSpace+'/static/js');

    //copy the base images that are used by the options setup (for the example)
    this.directory('frameworks/images', this.themeNameSpace+'/dev/src/images');


    //copy framework/base js across
    this.directory('frameworks/js', this.themeNameSpace+'/dev/src/js');

    //build sass dirs so I can process templates
    this.directory('frameworks/scss/modules', this.themeNameSpace+'/dev/src/scss/modules');
    this.directory('frameworks/scss/core', this.themeNameSpace+'/dev/src/scss/core');
    this.directory('frameworks/scss/constructors', this.themeNameSpace+'/dev/src/scss/constructors');
    
    this.template('frameworks/scss/_variables.scss', this.themeNameSpace+'/dev/src/scss/_variables.scss', context);
    this.template('frameworks/scss/style.scss', this.themeNameSpace+'/dev/src/scss/style.scss', context);
    this.template('frameworks/scss/ie.scss', this.themeNameSpace+'/dev/src/scss/ie.scss', context);


   
    

   
    this.template('_package.json', this.themeNameSpace+'/dev/tasks/package.json', context);

    //bower setup
    this.template('_.bowerrc', this.themeNameSpace+'/dev/tasks/.bowerrc', context);
    this.template('_bower.json', this.themeNameSpace+'/dev/tasks/bower.json', context);


    //copy grunt setup
    this.template("_Gruntfile.js", this.themeNameSpace+"/dev/tasks/Gruntfile.js", context);
    


  },

  projectfiles: function () {
    this.copy('editorconfig', this.themeNameSpace+'/.editorconfig');
    this.copy('jshintrc', this.themeNameSpace+'/.jshintrc');
  }
});

module.exports = StartWPSiteGenerator;