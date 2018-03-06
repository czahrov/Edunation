<?php
	/* if( !isset( $_COOKIE['sprytne'] ) ){
		include "wbudowie.php";
		exit;
		
	} */
	
	if( get_post()->ID === 41 ){
		$infix = DMODE?( '' ):( '.min' );
		$buster = DMODE?( time() ):( false );
		wp_enqueue_script( "gch", get_template_directory_uri() . "/js/gchandler{$infix}.js", array(), $buster );
		
	}
	
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