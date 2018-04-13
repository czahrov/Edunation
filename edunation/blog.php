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
	<div id='oferta'>
		<div class='banner' style='background-image:url(<?php echo get_the_post_thumbnail_url(); ?>);'></div>
		<div class='menu_bar'>
			<div class='menu grid flex flex-items-center-mm flex-column flex-row-mm'>
				<a class='item regular alt inline-flex flex-items-center flex-justify-center <?php if( !isset( $_GET['cat'] ) ) echo 'active'; ?>' href='<?php echo home_url( 'blog' ); ?>'>Wszystkie</a>
				<?php
					$cats = get_terms( array(
						'taxonomy' => 'category',
						'parent' => 16,
						'hide_empty' => false,
						
					) );
					foreach( $cats as $item ):
				?>
				<a class='item regular alt inline-flex flex-items-center flex-justify-center <?php if( $_GET['cat'] === $item->name ) echo 'active'; ?>' href='<?php echo home_url( "blog?cat={$item->slug}" ); ?>'>
					<?php echo $item->name; ?>
				</a>
				<?php endforeach; ?>
			</div>
			
		</div>
		<div class='column grid flex flex-column flex-row-ds'>
			<div class='main grow'>
				<?php
					$cat_slug = isset( $_GET[ 'cat' ] )?( $_GET[ 'cat' ] ):( 'blog' );
					
					$posts = get_posts( array(
						'category_name' => $cat_slug,
						'numberposts' => -1,
						
					) );
					foreach( $posts as $post ):
				?>
				<div class='item flex flex-column flex-row-mm'>
					<div class='img base2' style='background-image:url( <?php echo get_the_post_thumbnail_url(); ?> )'></div>
					<div class='content text-center text-left-mm base2 flex flex-column'>
						<div class='title'>
							<?php echo $post->post_title; ?>
						</div>
						<div class='info'>
							<?php
								printf(
									"w %s",
									implode( ", ", wp_get_post_categories( $post->ID, array(
										'fields' => 'names',
										'exclude' => array( get_category_by_slug( 'blog' )->cat_ID ),
										
									) ) )
									
								);
								
							?>
						</div>
						<div class='excerpt'>
							<?php echo $post->post_excerpt; ?>
						</div>
						<div class='more flex flex-items-center flex-justify-center'>
							<?php
								printf(
									"<a href='%s'>Kontynuuj czytanie</a>",
									get_the_permalink( $post->ID )
								);
								
							?>
						</div>
						<div class='social flex flex-justify-around flex-justify-start-mm'>
							<a class='icon flex flex-items-center flex-justify-center' href='https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink( $post->ID ); ?>' target='_blank'>
								<div class='fa fa-facebook'></div>
							</a>
							<a class='icon flex flex-items-center flex-justify-center' href="whatsapp://send?text=<?php echo urlencode( $post->post_title ); ?>" data-action="share/whatsapp/share">
								<i class="fa fa-whatsapp"></i>
							</a>
							<a class='icon flex flex-items-center flex-justify-center' href="fb-messenger://share/?link=<?php echo urlencode( the_permalink( $post->ID ) ); ?>">
								<div class='fa fa-facebook'></div>
							</a>
							
						</div>
						
					</div>
					
				</div>
				<?php endforeach; ?>
			</div>
			<?php get_template_part( 'template/sidebar', 'blog' ); ?>
			
		</div>
		
	</div>
	<div class="line"></div>
	<!-- FOOTER -->
	<?php get_footer();?>