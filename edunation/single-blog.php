<?php
	/*
	Template Name: Strona pojedyncza dla bloga
	*/
	get_header();
	$post = get_post();
?>
<!--NAVIGATION -->
<body id="blog">
	<header>
		<nav class="main-nav">
			<?php get_template_part("template/menu"); ?>
		</nav>
	</header>
	<!--BLOG-->
	<div id='single'>
		<div class='column grid flex flex-column flex-row-ds'>
			<div class='main grow flex flex-column flex-items-center'>
				<div class='title bold alt'>
					<?php echo $post->post_title; ?>
				</div>
				<div class='info'>
					<?php
						printf(
							"%s / %s / %s",
							get_the_author_meta( 'display_name', $post->post_author ),
							date_i18n( "F d, Y", strtotime( $post->post_date ) ),
							wp_get_post_categories( $post->ID, array(
								'fields' => 'names',
								'count' => 1,
								'exclude' => array( get_category_by_slug( 'blog' )->cat_ID ),
								
							) )[0]
							
						);
						
					?>
				</div>
				<img class='img' src='<?php echo get_the_post_thumbnail_url(); ?>' />
				<div class='content text-center text-left-mm'>
					<?php echo apply_filters( 'the_content', $post->post_content ); ?>
				</div>
				<div class='social flex flex-self-stretch flex-justify-around flex-justify-start-mm'>
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
				<?php get_template_part( 'template/segment-comment', 'form' ); ?>
				<?php
					if( comments_open() ){
						get_template_part( 'template/segment-comment', 'view' );
						
					}
				?>
				
				
			</div>
			<?php get_template_part( 'template/sidebar', 'blog' ); ?>
			
		</div>
		
	</div>
	<div class="line"></div>
	
<!-- FOOTER -->
<?php get_footer(); ?>