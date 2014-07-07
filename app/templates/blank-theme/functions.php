<?php
/**
 * <%= themeName %> functions file
 *
 * @package WordPress
 * @subpackage <%= themeName %>
 * @since <%= themeName %> 1.0
 */


/******************************************************************************\
    Theme support, standard settings, menus and widgets
\******************************************************************************/

add_theme_support( 'post-formats', array( 'image', 'quote', 'status', 'link' ) );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'automatic-feed-links' );

$custom_header_args = array(
    'width'         => 980,
    'height'        => 300,
    'default-image' => get_template_directory_uri() . '/images/header.png',
);
add_theme_support( 'custom-header', $custom_header_args );

/**
 * Print custom header styles
 * @return void
 */
function <%= themeNameSpace %>_custom_header() {
    $styles = '';
    if ( $color = get_header_textcolor() ) {
        echo '<style type="text/css"> ' .
                '.site-header .logo .blog-name, .site-header .logo .blog-description {' .
                    'color: #' . $color . ';' .
                '}' .
             '</style>';
    }
}
add_action( 'wp_head', '<%= themeNameSpace %>_custom_header', 11 );

$custom_bg_args = array(
    'default-color' => 'fba919',
    'default-image' => '',
);
add_theme_support( 'custom-background', $custom_bg_args );

register_nav_menu( 'main-menu', __( 'Your sites main menu', '<%= themeNameSpace %>' ) );

if ( function_exists( 'register_sidebars' ) ) {
    register_sidebar(
        array(
            'id' => 'home-sidebar',
            'name' => __( 'Home widgets', '<%= themeNameSpace %>' ),
            'description' => __( 'Shows on home page', '<%= themeNameSpace %>' )
        )
    );

    register_sidebar(
        array(
            'id' => 'footer-sidebar',
            'name' => __( 'Footer widgets', '<%= themeNameSpace %>' ),
            'description' => __( 'Shows in the sites footer', '<%= themeNameSpace %>' )
        )
    );
}

if ( ! isset( $content_width ) ) $content_width = 650;

/**
 * Include editor stylesheets
 * @return void
 */
function <%= themeNameSpace %>_editor_style() {
    add_editor_style( 'css/wp-editor-style.css' );
}
add_action( 'init', '<%= themeNameSpace %>_editor_style' );


/******************************************************************************\
    Scripts and Styles
\******************************************************************************/

/**
 * Enqueue <%= themeNameSpace %> scripts
 * @return void
 */
// Load jQuery
if ( !is_admin() ) {
   wp_deregister_script('jquery');
   wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"), false);
   wp_enqueue_script('jquery');
}

    
function <%= themeNameSpace %>_enqueue_scripts() {
    wp_enqueue_style( '<%= themeNameSpace %>-styles', get_template_directory_uri() . '/static/css/style.css' ); //our stylesheet
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'default-scripts', get_template_directory_uri() . '/js/scripts.min.js', array(), '1.0', true );
    if ( is_singular() ) wp_enqueue_script( 'comment-reply' );
}
add_action( 'wp_enqueue_scripts', '<%= themeNameSpace %>_enqueue_scripts' );


/******************************************************************************\
    Content functions
\******************************************************************************/

/**
 * Displays meta information for a post
 * @return void
 */
function <%= themeNameSpace %>_post_meta() {
    if ( get_post_type() == 'post' ) {
        echo sprintf(
            __( 'Posted %s in %s%s by %s. ', '<%= themeNameSpace %>' ),
            get_the_time( get_option( 'date_format' ) ),
            get_the_category_list( ', ' ),
            get_the_tag_list( __( ', <b>Tags</b>: ', '<%= themeNameSpace %>' ), ', ' ),
            get_the_author_link()
        );
    }
    edit_post_link( __( ' (edit)', '<%= themeNameSpace %>' ), '<span class="edit-link">', '</span>' );
}