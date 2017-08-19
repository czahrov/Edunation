<?php
	/*
	Template Name: Rezerwacje
	*/
	get_header();
?>
<!--NAVIGATION -->
<body>
	<header>
		<?php get_template_part("template/menu"); ?>
	</header>
<!--SINGLE-->
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
	<div class="grid padding">
		 
		 
		 
		   <?php
		// TO SHOW THE PAGE CONTENTS
		while ( have_posts() ) : the_post(); ?> <!--Because the_content() works only inside a WP Loop -->
			<div class="entry-content-page">
				<?php the_content(); ?> <!-- Page Content -->
			</div><!-- .entry-content-page -->

		<?php
		endwhile; //resetting the page loop
		wp_reset_query(); //resetting the page query
		?>
		 
		 
	
	</div>


<div class="line"></div>

<script>

$(document).ready(function(){
	//$(".step .filter option[value=5]").prop('selected', 'selected');
});
</script>


<!-- FOOTER -->
<?php get_footer(); ?>