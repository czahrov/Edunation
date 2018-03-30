<?php
	if( in_array( 12, wp_get_post_categories( get_post()->ID ) ) ){
		get_template_part( 'single', 'oferta' );
		
	}
	else{
		get_template_part( 'single', 'blog' );
		
		
	}
	
?>