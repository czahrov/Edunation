<?php
add_theme_support('post-thumbnails');

if( !is_admin() ){
	wp_enqueue_style( "fonts", get_template_directory_uri() . "/css/fonts.css", array() );
	wp_enqueue_style( "font-awesome", get_template_directory_uri() . "/css/font-awesome.min.css", array() );
	wp_enqueue_style( "facepalm", get_template_directory_uri() . "/css/facepalm.css", array() );
	wp_enqueue_style( "style", get_template_directory_uri() . "/style.css", array() );
	wp_enqueue_style( "override", get_template_directory_uri() . "/override.css", array() );
	
	wp_enqueue_script( "jQ", get_template_directory_uri() . "/js/jquery.js" );
	wp_enqueue_script( "jQGSAP", get_template_directory_uri() . "/js/jquery.gsap.min.js" );
	wp_enqueue_script( "TweenLite", get_template_directory_uri() . "/js/TweenLite.min.js" );
	wp_enqueue_script( "TimelineLite", get_template_directory_uri() . "/js/TimelineLite.min.js" );
	wp_enqueue_script( "CSSPlugin", get_template_directory_uri() . "/js/CSSPlugin.min.js" );
	wp_enqueue_script( "ScrollTo", get_template_directory_uri() . "/js/ScrollToPlugin.min.js" );
	wp_enqueue_script( "RoundProps", get_template_directory_uri() . "/js/RoundPropsPlugin.min.js" );
	wp_enqueue_script( "main", get_template_directory_uri() . "/js/main.js" );
	wp_enqueue_script( "facepalm", get_template_directory_uri() . "/js/facepalm.js" );

}


$args = array(
	'numberposts' => 10,
	'offset' => 0,
	'category' => 0,
	'orderby' => 'post_date',
	'order' => 'DESC',
	'include' => '',
	'exclude' => '',
	'meta_key' => '',
	'meta_value' =>'',
	'post_type' => 'post',
	'post_status' => 'draft, publish, future, pending, private',
	'suppress_filters' => true
);

$recent_posts = wp_get_recent_posts( $args, ARRAY_A );

add_action( 'print_page_title', function( $arg ){
	$site_title = get_bloginfo( 'name' );
	
	if( is_home() ){
		printf( "%s | %s", 'Strona główna', $site_title );
		
	}
	else{
		$page_title = get_post()->post_title;
		printf( "%s | %s", $page_title, $site_title );
		
	}	
	
} );

class DateManager{
	
	
}