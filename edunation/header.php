<?php
	/* if( !isset( $_COOKIE['sprytne'] ) ){
		include "wbudowie.php";
		exit;
		
	} */
	
	$infix = DMODE?( "" ):( ".min" );
	$buster = DMODE?( time() ):( false );
	
	wp_enqueue_style( "JQ_UI", get_template_directory_uri() . "/css/jquery-ui{$infix}.css", array(), $buster );
	wp_enqueue_style( "JQ_UI_struct", get_template_directory_uri() . "/css/jquery-ui.structure{$infix}.css", array(), $buster );
	wp_enqueue_style( "fonts", get_template_directory_uri() . "/css/fonts.css", array() );
	wp_enqueue_style( "font-awesome", get_template_directory_uri() . "/css/font-awesome.min.css", array() );
	wp_enqueue_style( "facepalm", get_template_directory_uri() . "/css/facepalm.min.css", array() );
	wp_enqueue_style( "style", get_template_directory_uri() . "/style{$infix}.css", array(), $buster );
	wp_enqueue_style( "override", get_template_directory_uri() . "/override{$infix}.css", array(), $buster );
	wp_enqueue_style( "override_map", get_template_directory_uri() . "/override.css.map", array(), $buster );
	
	wp_enqueue_script( "jQ", get_template_directory_uri() . "/js/jquery.js" );
	wp_enqueue_script( "jQ-UI", get_template_directory_uri() . "/js/jquery-ui.min.js" );
	wp_enqueue_script( "jQGSAP", get_template_directory_uri() . "/js/jquery.gsap.min.js" );
	wp_enqueue_script( "TweenLite", get_template_directory_uri() . "/js/TweenLite.min.js" );
	wp_enqueue_script( "TimelineLite", get_template_directory_uri() . "/js/TimelineLite.min.js" );
	wp_enqueue_script( "CSSPlugin", get_template_directory_uri() . "/js/CSSPlugin.min.js" );
	wp_enqueue_script( "ScrollTo", get_template_directory_uri() . "/js/ScrollToPlugin.min.js" );
	wp_enqueue_script( "RoundProps", get_template_directory_uri() . "/js/RoundPropsPlugin.min.js" );
	wp_enqueue_script( "JQTS", get_template_directory_uri() . "/js/jquery.touchSwipe.min.js" );
	if( get_post()->ID === 41 ){
		wp_enqueue_script( "gch", get_template_directory_uri() . "/js/gchandler{$infix}.js", array(), $buster );
	}
	wp_enqueue_script( "jQWheel", get_template_directory_uri() . "/js/jquery.mousewheel.min.js", array(), false );
	
	wp_enqueue_script( "main", get_template_directory_uri() . "/js/main{$infix}.js", array(), $buster );
	wp_enqueue_script( "facepalm", get_template_directory_uri() . "/js/facepalm{$infix}.js", array(), $buster );
	
	
?>
<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="utf-8">
  	<title><?php do_action( 'print_page_title' ); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
 	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <?php wp_head(); ?>
</head>