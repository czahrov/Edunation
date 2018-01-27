<!--NAVIGATION -->
<body id="blog" class='<?php do_action( 'body_markup' ); ?>'>
	<header>
		<nav class="main-nav">
			<?php get_template_part("template/menu"); ?>
		</nav>
		
	</header>
<!--BLOG-->
	
	
	<div id='blog' class="blog">
		<div class="inner grid padding">
			<div class="title font-basic-medium">Szybko, bez stresu, on the go!</div>
			<div class="wrapper flex flex-wrap">
				<?php
				$posts = get_posts( array(
					'numberposts' => -1,
					'category_name' => 'oferta',
					
				) );
					
			    foreach ( $posts as $post ):				
					$title = $post->post_title;
					$meta = get_post_meta( $post->ID );
					echo "<!--";
					// print_r( $meta );
					echo "-->";
					$cena = $meta[ 'cena' ][0];
					$duration = $meta[ 'czas_trwania' ][0];
					$motywator = $meta[ 'motywator' ][0];
					$img = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'full' );
					$img_alt = 'https://placeimg.com/100/100/person';
					$url = get_permalink( $post->ID );
					
				?>
				
				<div class="element base1 base2-mm base3-ml no-shrink">
					<div class="box flex flex-column flex-items-center">
						<div class="pic bgimg full" style="background-image: url('<?php echo empty( $img )?( $img_alt ):( $img ); ?>');"></div>
						<div class="title font-secondary-bold">
							<?php echo $title; ?>
						</div>
						<div class="text font-secondary-regular">
							<?php printf( "%u min | %.2f zł", $duration, $cena ); ?>
							<?php //echo $cena; ?>
						</div>
						<div class="desc font-secondary-regular">
							<?php echo $motywator ?>
						</div>
						<a class='hitbox' href='<?php echo $url; ?>'></a>
						<a class="button flex flex-items-center flex-justify-center font-secondary-bold" href='<?php echo home_url( sprintf( "rezerwacja/?type=%s", $post->ID ) ); ?>'>
							zarezerwuj
						</a>
						
					</div>
					
				</div>
				
				  <?php endforeach; 
					wp_reset_postdata()?>
			

			</div>
		</div>
	</div>
	
	
	<div class="line"></div>
