<?php
	/*
	Template Name: Rezerwacje
	*/
	get_header();
	
	if( empty( $_GET[ 'type' ] ) ){
		get_template_part( 'template/page-rezerwacja', 'typ' );
	}
	else{
		get_template_part( 'template/page-rezerwacja', 'kalendarz' );
		
	}
	
	get_footer();
?>
