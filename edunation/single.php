<?php
	/*
	Template Name: Single
	*/
	get_header();
?>
<!--NAVIGATION -->
<body id="single">
	<header>
		<?php get_template_part("template/menu"); ?>
	</header>
<!--SINGLE-->
<div class="single">
	<div class="inner grid padding">
		<div class="wrapper flex flex-wrap">
			<div class="box base1 base2-mm no-shrink">
				<div class="movie pops">
					<div class="cover" style="background-image: url(<?php echo get_the_post_thumbnail_url( $post_id, 'full' ); ?>);"></div>
					<div class="box">
						<div class="play flex flex-items-center flex-justify-center">
							<i class="fa fa-play-circle fa-4x" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="box base1 base2-mm no-shrink">
				<div class="desc">
					<div class="cat font-secondary-bold"><?php the_title(); ?></div>
					<div class="title font-secondary-regular"><?php the_field('tytul2'); ?></div>

					<div class="text">
						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

						<?php the_content(); ?>

						<?php endwhile; ?>
						<?php endif; ?>
					</div>
					<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
				</div>
			</div>
		</div>
	
		<div class="title font-secondary-medium">Zobacz także:</div>
		<div class="wrapper2 flex flex-wrap">
		
			<?php

				$args = array( 'posts_per_page' => 10, 'offset'=> 0, 'category' => 2 );
				$myposts = get_posts( $args );
					
			    foreach ( $myposts as $post ) : setup_postdata( $post ); ?>
		
			<a href="<?php the_permalink ();?>" class="element base1 base3-ml no-shrink">
				<div class="box flex flex-column flex-items-center">
					<div class="pic" style="background-image: url(<?php echo get_the_post_thumbnail_url( $post_id, 'full' ); ?>);"></div>
					<div class="title font-secondary-medium flex flex-column flex-justify-center"><?php the_title(); ?></div>
				</div>
			</a>
			
			  <?php endforeach; 
				wp_reset_postdata()?>
			
			
			<div class="element base1 base3-ml no-shrink flex flex-items-center flex-justify-center">
				<a href="blog.html" class="all flex flex-items-center flex-justify-center font-secondary-medium">
				Zobacz wszystkie
				</a>
			</div>	
			
		</div>
		<!--
		<a href="blog.html" class="all flex flex-items-center flex-justify-center font-secondary-medium">
			Zobacz wszystkie
		</a>
		-->
	</div>
</div>


<div class="line"></div>



<!-- POP UP -->
<div class="pop-container">
	<div class="pop-up flex flex-column">
		<div class="cross font-basic-bold flex flex-justify-end">x</div>
		<div class="content grow" id="videoplayer">
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="360" type="text/html" src="<?php the_field('filmik'); ?>"></iframe>
		</div>
	</div>
</div>

<!-- FOOTER -->

<!-- FOOTER -->
<?php get_footer(); ?>