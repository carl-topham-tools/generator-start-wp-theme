# generator-start-wp-theme

## About

A Yeoman generator for creating a starting point for developing Wordpress themes. You'll need npm, yeoman, grunt & sass installed, but if your awesome you'll already have that setup.

## Setup

Install the package on your machine using:

    npm install generator-start-wp-theme

Lot's of code will happen. This may take a few minutes. Go make a beverage! When it's done you can use the generator like so... Navigate to your development Wordpress' theme folder [change path as needed]:

   cd ~/Sites/Development/Wordpress/wp-content/themes

Run the generator

    yo start-wp-theme

You will be prompted with a few basic questions to help the setup get started. Once you get past the description question you will again see lots of code. That's grunt and bower doing their thing. It's also time to drink your beverage!

## Development

In your theme folder you will now have a folder with the name of your theme which is setup with the basics to get a theme ofter the ground quickly. Grunt lives in the dev/tasks/ folder in your theme so navigate to that and run:

    grunt watch

This will watch your sass, js and images in the dev folder and the php files in your theme. If your using livereload then now would be a good time to start it! You should NEVER edit the css, js or image files in static. Static is used for serving the files and they are replaced when grunt detects changes in dev! So with that firndly warning it's time to build your theme!... Off you go!

* Dev = GOOD!
* Static = BAD!

## Production

When you're done and ready to go live you'll need to minify your js and whatnot. You can do this by using:

    grunt prod

*MEGA BIG WARNING!!!! This will minify all css, js and image files in the static folder and OVERWRITE THEM with minified versions of the same name (so WP doesn't need paths to be changed)! Make sure any css, js and images are kept in the dev folder.*

Once the prod is complete you'll notice a new .zip file with your theme name! That's your theme all packeged up, minfied, optimized and shiny.

* Upload
* Activate
* ?????
* Profit



## Sundries

### Theme structure

/dev/ - Where you will be working.
/static/ - wp links to theme files in here - dev compiles to here.
/_inc/ - The settings framework.
/content-parts/ - Where to put your template parts such as loops etc (if you want to)

style.css - names and sets up your theme as far as WP is concerned.
functions.php - your theme functions
options.php - options for the settings framework
*.php your theme files

    themename
    |
    |-dev
    | |-scss
    | |-js
    | |-images
    | |-fonts
    |
    |-static
    | |-css
    | |-js
    | |-images
    | |-fonts
    |
    |-content-parts
    |
    |-_inc
    |
    |*.php
    |style.css

