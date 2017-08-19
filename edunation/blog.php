<?php
	/*
	Template Name: Blog
	*/
	get_header();
?>
<!--NAVIGATION -->
<body id="blog">
	<header>
		<nav class="main-nav">
			<?php get_template_part("template/menu"); ?>
		</nav>
		
	</header>
<!--BLOG-->
	
	
	<div class="blog">
		<div class="inner grid padding">
			<div class="title font-basic-medium">Szybko, bez stresu, on the go!</div>
			<div class="wrapper flex flex-wrap">
			
			
				<?php

				$args = array( 'posts_per_page' => 10, 'offset'=> 0, 'category' => 0 );
				$myposts = get_posts( $args );
					
			    foreach ( $myposts as $post ) : setup_postdata( $post ); ?>
				
				
				<div class="element base1 base3-ml no-shrink">
					<a href="<?php the_permalink ();?>" class="box flex flex-column flex-items-center">
						<div class="pic"></div>
						<div id="<?php echo post_name; ?>" class="title font-secondary-bold"><?php the_title(); ?></div>
						<div class="text font-secondary-regular"><?php the_field('cena'); ?></div>
						<div class="desc font-secondary-regular"><?php the_field('motywator'); ?></div>
						<div class="button flex flex-items-center flex-justify-center font-secondary-bold">zarezerwuj</div>
					</a>
				</div>
				
				  <?php endforeach; 
					wp_reset_postdata()?>
			

			</div>
		</div>
	</div>
	
	
	<div class="line"></div>

<!-- FOOTER -->
<?php get_footer();?>