<?php
	/*
	Template Name: Single
	*/
	get_header();
?>
<!--NAVIGATION -->
<body id="single">
	<?php
	$post = get_post();
	$meta = get_post_meta( $post->ID );
	$cats = wp_get_post_categories( $post->ID );
	echo "<!--";
	// print_r( $meta );
	// print_r( $post );
	// print_r( $cats );
	echo "-->";
		
	?>
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
					<div class="cat font-secondary-bold"><?php echo $post->post_title; ?></div>
					<div class="title font-secondary-regular"><?php echo $meta[ 'naglowek' ][0]; ?></div>

					<div class="text">
						<?php echo $post->post_content; ?>
					</div>
					<a href="<?php echo home_url( "rezerwacja?type={$post->ID}" ); ?>" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
				</div>
			</div>
		</div>
	
		<div class="title font-secondary-medium">Zobacz także:</div>
		<div class="wrapper2 flex flex-wrap">
		
			<?php
				$cat_check = array(
					'business-english',
					'general-english',
					'11-sessions',
					'mummy-daddy'
					
				);
				$cat_for = null;
				
				foreach( $cat_check as $check ){
					if( in_array( get_category_by_slug( $check )->cat_ID, $cats ) ){
						$cat_for = $check;
						break;
						
					}	
					
				}
				
				if( $cat_for !== null ):
					
					$posts = get_posts( array( 
						'category_name' => $cat_for, 
						'category__and' => array(
							get_category_by_slug( 'kafelki-na-stronie-glownej' )->cat_ID,
						),
						'post__not_in' => array(
							$post->ID,
						),
						
					) );
						
					foreach ( $posts as $item ) : ?>
			
				<a href="<?php echo get_the_permalink( $item->ID ); ?>" class="element base1 base3-ml no-shrink">
					<div class="box flex flex-column flex-items-center">
						<div class="pic" style="background-image: url(<?php echo get_the_post_thumbnail_url( $item->ID, 'full' ); ?>);"></div>
						<div class="title font-secondary-medium flex flex-column flex-justify-center"><?php echo $item->post_title; ?></div>
					</div>
				</a>
			
			  <?php
					endforeach;
				endif;
			?>
			
			
			<div class="element base1 base3-ml no-shrink flex flex-items-center flex-justify-center">
				<a href="<?php echo home_url( 'rezerwacja' ); ?>" class="all flex flex-items-center flex-justify-center font-secondary-medium">
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
			<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="360" type="text/html" src="<?php echo $meta[ 'filmik' ][0]; ?>"></iframe>
		</div>
	</div>
</div>

<!-- FOOTER -->

<!-- FOOTER -->
<?php get_footer(); ?>