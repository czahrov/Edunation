<?php
	/*
		Template Name: Strona główna
	*/
	get_header();
?>
<body id="home" class='<?php do_action( 'body_markup' ); ?>'>
	<header>
		<?php get_template_part("template/menu"); ?>
		<div class="header-main flex flex-justify-between">
			<div class="grid padding flex flex-row flex-items-center">
				<div class="header-content flex flex-column no-shrink">
					<h1 class="font-basic-light"><span class="underline-closking">Hello to you! </span><span>My name is Lucas.</span></h1>
					<p class="font-basic-bold"><span>Let's design your </span> <span>English excellence.</span></p>
					<a href="#busines-english">
						<div class="angle"><i class="fa fa-angle-down fa-4x" aria-hidden="true"></i></div>
					</a>
				</div>
				<div class="img-box grow flex flex-justify-end">
					<img class="header-img shrink" src="<?php echo get_template_directory_uri(); ?>/img/header.png" alt="Lucas">
				</div>
			</div>
		</div>
	</header>
	<!-- Business -->
	<div class="business" id="busines-english">
		<?php
			$data = homeSection( 'business-english' );
				echo "<!--";
				// print_r( $data );
				echo "-->";
			?>
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular"><?php echo $data[ 'head' ][ 'title' ]; ?></div>
			<div class="title2 font-basic-bold"><?php echo $data[ 'head' ][ 'subtitle' ]; ?></div>
		</div>
		<a href="#business-training" class="roll-down flex flex-items-center flex-justify-center pointer arrow-box-down">
		<img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png">
		</a>
	</div>
	<!-- TRAINING -->
	<div class="training" id="business-training">
		<div class="wrapper flex no-wrap">
			<?php foreach( $data[ 'items' ] as $item ): ?>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon">
						<img src="<?php echo $item[ 'icon' ]; ?>">
					</div>
					<div class="title font-secondary-bold">
						<?php echo $item[ 'title' ]; ?>
					</div>
					<div class="text">
						<?php echo $item[ 'subtitle' ]; ?>
					</div>
					<a href="<?php echo $item[ 'url' ]; ?>" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo $item[ 'img' ]; ?>);"></div>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="pagin flex flex-justify-center hide-ml">
			<?php foreach( $data[ 'items' ] as $num => $item ): ?>
			<div class="item pointer <?php echo $num === 0?( ' active ' ):( '' ); ?>"></div>
			<?php endforeach; ?>
		</div>
	</div>
	<div class='referencje bg-gray-light font-gray-dark'>
		<?php
			echo "<!--";
			// print_r( sliderReferencje() );
			echo "-->";
			?>
		<div class='box grid text-center'>
			<div class='title uppercase bold alt'>
				Power your business with Edunation
			</div>
			<div class='subtitle'>
				Współpracują ze mną w 2017
			</div>
			<div class='slider'>
				<div class='view flex'>
					<?php foreach( sliderReferencje() as $item ): ?>
					<div class='slide bg-light base1 no-shrink flex flex-column flex-justify-between'>
						<?php if( !empty( $item[ 'logo' ] ) ): ?>
						<div class='logo bgimg contain' style='background-image:url(<?php echo $item[ 'logo' ]; ?>);'></div>
						<?php endif; ?>
						<div class='text'>
							<?php echo $item[ 'content' ]; ?>
						</div>
						<div class='author'>
							<?php echo implode( "<br>", array( $item[ 'person' ], $item[ 'position' ], $item[ 'contact' ] ) ); ?>
						</div>
						<div class='img bgimg full' style='background-image:url(<?php echo empty( $item[ 'img' ] )?( $item[ 'img_alt' ] ):( $item[ 'img' ] ); ?>);'></div>
					</div>
					<?php endforeach; ?>
				</div>
				<div class='nav prev pointer hide block-mm'>
					<span class='icon fa fa-angle-left flex flex-items-center flex-justify-center'></span>
				</div>
				<div class='nav next pointer hide block-mm'>
					<span class='icon fa fa-angle-right flex flex-items-center flex-justify-center'></span>
				</div>
				<div class='pagin flex flex-items-center flex-justify-center hide-mm'>
					<?php foreach( sliderReferencje() as $num => $item ): ?>
					<div class='item pointer <?php if( $num === 0 ) echo 'active'; ?>'></div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
	<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title"><span class="block inline-mm">Szkolenia dla pracowników, </span><span class="block inline-mm">zajęcia indywidualne?</span></div>
				<div class="title font-basic-bold">Porozmawiajmy o Twoim biznesie</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
	<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster.jpg);"></div>
	</div>
	<!-- Business -->
	<div class="business"  id="general-english">
		<?php
			$data = homeSection( 'general-english' );
				echo "<!--";
				// print_r( $data );
				echo "-->";
			?>
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular"><?php echo $data[ 'head' ][ 'title' ]; ?></div>
			<div class="title2 font-basic-bold"><?php echo $data[ 'head' ][ 'subtitle' ]; ?></div>
		</div>
		<a href="#general-training" class="roll-down flex flex-items-center flex-justify-center pointer arrow-box-down">
		<img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png">
		</a>
	</div>
	<!-- TRAINING -->
	<div class="training training2" id="general-training">
		<div class="wrapper flex no-wrap">
			<?php foreach( $data[ 'items' ] as $item ): ?>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon">
						<img src="<?php echo $item[ 'icon' ]; ?>">
					</div>
					<div class="title font-secondary-bold">
						<?php echo $item[ 'title' ]; ?>
					</div>
					<div class="text">
						<?php echo $item[ 'subtitle' ]; ?>
					</div>
					<a href="<?php echo $item[ 'url' ]; ?>" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo $item[ 'img' ]; ?>);"></div>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="pagin flex flex-justify-center hide-ml">
			<?php foreach( $data[ 'items' ] as $num => $item ): ?>
			<div class="item pointer <?php echo $num === 0?( ' active ' ):( '' ); ?>"></div>
			<?php endforeach; ?>
		</div>
	</div>
	<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster2.jpg);"></div>
	</div>
	<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">Chcesz studiować, pracować za granicą, wyjeżdzasz?</div>
				<div class="title font-basic-bold">Przygotuję Cię językowo</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
	<!-- POSTER -->
	<?php
		$movie1 = get_post_meta( get_post()->ID, 'movie1', true );
		if( !empty( $movie1 ) ):
	?>
	<video autoplay muted loop>
		<source src="<?php echo wp_get_attachment_url( $movie1 ); ?>" type="<?php echo get_post( $movie1 )->post_mime_type; ?>" />
	</video>
	<?php endif;?>
	<!-- Business Sessions-->
	<div class="business" id='sessions'>
		<?php
			$data = homeSection( '11-sessions' );
				echo "<!--";
				// print_r( $data );
				echo "-->";
			?>
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular"><?php echo $data[ 'head' ][ 'title' ]; ?></div>
			<div class="title2 font-basic-bold"><?php echo $data[ 'head' ][ 'subtitle' ]; ?></div>
		</div>
		<a href="#sessions-training" class="roll-down flex flex-items-center flex-justify-center pointer arrow-box-down">
		<img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png">
		</a>
	</div>
	<!-- TRAINING -->
	<div class="training training2" id="sessions-training">
		<div class="wrapper flex no-wrap">
			<?php foreach( $data[ 'items' ] as $item ): ?>
			<div class="box flex no-shrink base1 base3-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon">
						<img src="<?php echo $item[ 'icon' ]; ?>">
					</div>
					<div class="title font-secondary-bold">
						<?php echo $item[ 'title' ]; ?>
					</div>
					<div class="text">
						<?php echo $item[ 'subtitle' ]; ?>
					</div>
					<a href="<?php echo $item[ 'url' ]; ?>" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo $item[ 'img' ]; ?>);"></div>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="pagin flex flex-justify-center hide-ml">
			<?php foreach( $data[ 'items' ] as $num => $item ): ?>
			<div class="item pointer <?php echo $num === 0?( ' active ' ):( '' ); ?>"></div>
			<?php endforeach; ?>
		</div>
	</div>
	<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster4.jpg);"></div>
	</div>
	<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">Konkretny cel?</div>
				<div class="title font-basic-bold">Twój sukces, moim sukcesem</div>
			</div>
			<a href="#" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
	<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster5.jpg);"></div>
	</div>
	<!-- Business MUMMY -->
	<div class="business" id='mummy'>
		<?php
			$data = homeSection( 'mummy-daddy' );
				echo "<!--";
				// print_r( $data );
				echo "-->";
			?>
		<div class="business-content grid padding flex flex-column flex-justify-center">
			<div class="title1 font-basic-regular"><?php echo $data[ 'head' ][ 'title' ]; ?></div>
			<div class="title2 font-basic-bold"><?php echo $data[ 'head' ][ 'subtitle' ]; ?></div>
		</div>
		<a href="#mummy-training" class="roll-down flex flex-items-center flex-justify-center pointer arrow-box-down">
		<img class="arrow-img-down" src="<?php echo get_template_directory_uri(); ?>/img/arrow_small.png">
		</a>
	</div>
	<!-- TRAINING -->
	<div class="training training2" id="mummy-training">
		<div class="wrapper flex no-wrap">
			<?php foreach( $data[ 'items' ] as $item ): ?>
			<div class="box flex no-shrink base1 base2-ml">
				<div class="inner flex flex-column flex-items-center">
					<div class="icon">
						<img src="<?php echo $item[ 'icon' ]; ?>">
					</div>
					<div class="title font-secondary-bold">
						<?php echo $item[ 'title' ]; ?>
					</div>
					<div class="text">
						<?php echo $item[ 'subtitle' ]; ?>
					</div>
					<a href="<?php echo $item[ 'url' ]; ?>" class="button flex flex-items-center flex-justify-center font-basic-bold">zaczynajmy</a>
				</div>
				<div class="cover" style="background-image: url(<?php echo $item[ 'img' ]; ?>);"></div>
			</div>
			<?php endforeach; ?>
		</div>
		<div class="pagin flex flex-justify-center hide-ml">
			<?php foreach( $data[ 'items' ] as $num => $item ): ?>
			<div class="item pointer <?php echo $num === 0?( ' active ' ):( '' ); ?>"></div>
			<?php endforeach; ?>
		</div>
	</div>
	<!-- POSTER -->
	<?php
		$movie2 = get_post_meta( get_post()->ID, 'movie2', true );
		if( !empty( $movie2 ) ):
	?>
	<video autoplay muted loop>
		<source src="<?php echo wp_get_attachment_url( $movie2 ); ?>" type="<?php echo get_post( $movie2 )->post_mime_type; ?>" />
	</video>
	<?php endif;?>
	<div class='opinie bg-gray-light font-gray-dark'>
		<?php
			echo "<!--";
			// print_r( sliderOpinie() );
			echo "-->";
			?>
		<div class='box grid text-center'>
			<div class='title uppercase bold alt'>
				Przeczytaj opinie rodziców
			</div>
			<div class='slider'>
				<div class='view flex'>
					<?php foreach( sliderOpinie() as $item ): ?>
					<div class='slide bg-light base1 no-shrink flex flex-column flex-justify-between'>
						<?php if( !empty( $item[ 'logo' ] ) ): ?>
						<div class='logo bgimg contain' style='background-image:url(<?php echo $item[ 'logo' ]; ?>);'></div>
						<?php endif; ?>
						<div class='text'>
							<?php echo $item[ 'content' ]; ?>
						</div>
						<div class='author'>
							<?php echo implode( "<br>", array( $item[ 'person' ], $item[ 'description' ] ) ); ?>
						</div>
						<div class='img bgimg full' style='background-image:url(<?php echo empty( $item[ 'img' ] )?( $item[ 'img_alt' ] ):( $item[ 'img' ] ); ?>);'></div>
					</div>
					<?php endforeach; ?>
				</div>
				<div class='nav prev pointer hide block-mm'>
					<span class='icon fa fa-angle-left flex flex-items-center flex-justify-center'></span>
				</div>
				<div class='nav next pointer hide block-mm'>
					<span class='icon fa fa-angle-right flex flex-items-center flex-justify-center'></span>
				</div>
				<div class='pagin flex flex-items-center flex-justify-center hide-mm'>
					<?php foreach( sliderReferencje() as $num => $item ): ?>
					<div class='item pointer <?php if( $num === 0 ) echo 'active'; ?>'></div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
	<!-- Information -->
	<div class="information">
		<div class="inner grid padding flex flex-column flex-items-center">
			<div class="title-box flex flex-column flex-justify-center">
				<div class="title">To jak, zaczynamy?</div>
				<div class="title font-basic-bold">Razem znajdziemy wspólny język.</div>
			</div>
			<a href="single.html" class="button flex flex-items-center flex-justify-center font-secondary-bold">zaczynajmy</a>
		</div>
	</div>
	<!-- POSTER -->
	<div class="poster">
		<div class="pic" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/poster7.jpg);"></div>
	</div>
	<!-- Contact -->
	<div class="contact flex flex-column flex-row-ml">
		<div class="box base1 base3-ml">
			<div class="inner grid padding flex flex-column flex-items-center">
				<div class="title font-basic-extrabold">Contact <span class="pretty">me</span></div>
				<div class="text font-secondary-medium">889-774-241</div>
				<div class="text font-secondary-medium">lucas@edunation.pl</div>
				<div class="icon"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/skype.png" alt="skype"></div>
				<div class="text font-secondary-medium">edunation_lucas</div>
			</div>
		</div>
		<div class="box base1 base3-ml">
			<div class="inner grid padding flex flex-column flex-items-center">
				<div class="title font-basic-extrabold">Tell <span class="pretty">me</span></div>
				<div class="text font-secondary-medium">Masz pytania? Mam odpowiedzi!</div>
				<form id='contact'>
					<div class="wrapper flex flex-wrap flex-justify-center">
						<div class="personal base1 base2-mm no-shrink">
							<input type="text" id="name" name="imie" placeholder="Imię">
							<input type="email" id="email" name="email" placeholder="E-mail">
							<input type="text" id="subject" name="subject" placeholder="Temat">
						</div>
						<div class="message base1 base2-mm no-shrink">
							<textarea placeholder="Wiadomość" name='msg'></textarea>
						</div>
						<div class="font-secondary-bold send uppercase pointer flex flex-items-center flex-justify-center">wyślij</div>
						<div class='status base1 flex flex-items-center'>
							<div class='icon ok fa fa-check-circle'></div>
							<div class='icon info fa fa-info-circle'></div>
							<div class='icon fail fa fa-times-circle'></div>
							<div class='text'></div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="box base1 base3-ml">
			<div class="inner grid padding flex flex-column flex-items-center">
				<div class="title font-basic-extrabold">Find <span class="pretty">me</span></div>
				<div class="text font-secondary-medium">Jestem tutaj! I nieźle sobie radzę</div>
				<div class="social flex flex-justify-between">
					<?php
						$meta = get_post_meta( get_page_by_title( 'Social' )->ID );
						/* echo "<!--";
						print_r( $meta );
						echo "-->"; */
						?>
					<a href="<?php echo $meta[ 'linkedin' ][0]; ?>" target="_blank" class="icon flex flex-items-center flex-juitify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/in.png" alt="in"></a>
					<a href="<?php echo $meta[ 'facebook' ][0]; ?>" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/fb.png" alt="facebook"></a>
					<a href="<?php echo $meta[ 'instagram' ][0]; ?>" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/instagram.png" alt="instagram"></a>
					<a href="<?php echo $meta[ 'youtube' ][0]; ?>" target="_blank" class="icon flex flex-items-center flex-justify-center"><img src="<?php echo get_template_directory_uri(); ?>/img/ikony/yt.png" alt="youtube"></a>
				</div>
			</div>
		</div>
	</div>
	<div class="line"></div>
	<!-- FOOTER -->
	<?php get_footer(); ?>