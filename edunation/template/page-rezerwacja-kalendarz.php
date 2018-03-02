<!--NAVIGATION -->
<body class='spaceTop <?php do_action( 'body_markup' ); ?>'>
	<header>
		<?php get_template_part("template/menu"); ?>
	</header>
	<div class='grid'>
		<?php
			$post = get_post( $_GET[ 'type' ] );
			$meta = get_post_meta( $post->ID );
			$data = array_merge(
				array(
					'title' => 'Lorem ipsum tytuł',
					'cena' => 'Lorem ipsum cena',
					'czas' => 'Lorem ipsum czas',
				),
				array(
					'title' => $post->post_title,
					'cena' => $meta[ 'cena' ][0],
					'czas' => $meta[ 'czas_trwania' ][0],
				)
				
			);
			
		?>
		<div id='rezerwacja' class='flex flex-column'>
			<div class='popup flex flex-items-center flex-justify-center'>
				
			</div>
			<div class='top text-center'>
				Grafik online
			</div>
			<div class='bot flex flex-column flex-row-mm flex-justify-end'>
				<div class='view grow flex'>
					<div class='etap date hide base1 no-shrink flex flex-column'>
						<div class='head flex flex-items-center flex-justify-center flex-justify-start-mm flex-wrap'>
							<div class='today regular alt'>
								<?php echo date( 'd.m.Y' ); ?>
							</div>
							<div class='button pointer bold uppercase bg-blue-dark font-light flex flex-items-center'>
								dzisiaj
							</div>
							<div class='month grow flex base1 base0-mm flex-wrap flex-items-center flex-justify-center'>
								<div class='nav prev pointer bg-blue-dark font-light flex flex-items-center'>
									<div class='icon fa fa-chevron-left'></div>
									
								</div>
								<div class='name regular alt flex base1 base0-ms flex-items-center flex-justify-center'></div>
								<div class='nav next pointer bg-blue-dark font-light flex flex-items-center'>
									<div class='icon fa fa-chevron-right'></div>
									
								</div>
								
							</div>
							
						</div>
						<div class='body flex'>
							<div class='side base8 flex flex-column'>
								<div class='cell'></div>
								<?php for( $i=6; $i<=21; $i++ ): ?>
								<div class='cell hour regular alt flex flex-items-center'>
									<?php printf( "%2u:00", $i ); ?>
								</div>
								<?php endfor; ?>
								
							</div>
							<div class='content flex'>
								<?php
									$days = array(
										'pn.' => 1,
										'wt.' => 2,
										'śr.' => 3,
										'czw.' => 4,
										'pt.' => 5,
										'so.' => 6,
										'nd.' => 0,
										
									);
								?>
								<?php foreach( $days as $name => $wd ): ?>
								<div class='day no-shrink base1 base2-ms base3-mm base5-ml base7-ds flex flex-column'>
									<div class='cell name bold alt flex flex-items-center flex-justify-center'>
										<?php echo $name; ?>
									</div>
									<div class='cell day grow' wd='<?php echo $wd; ?>'></div>
									
								</div>
								<?php endforeach; ?>
								
							</div>
							
						</div>
						
					</div>
					<div class='etap summary base1 no-shrink flex flex-column flex-items-center'>
						<div class='title text-center'></div>
						<div class='subtitle text-center'></div>
						<div class='table flex flex-items-center flex-justify-around'>
							<div class='tcell left text-center base3 flex flex-column'>
								<div class='title bold'></div>
								<div class='subtitle'></div>
								
							</div>
							<div class='tcell right text-center grow flex flex-column'>
								<div class='title bold'></div>
								<div class='subtitle'></div>
								<div class='subtitle'>
									online
								</div>
								<div id='authorize-button' class='button bold pointer uppercase bg-blue-dark font-light flex-self-center flex flex-items-center'>
									Dodaj do kalendarza Google
								</div>
								
							</div>
							
						</div>
						<a class='button bg-blue-dark font-light bold uppercase flex flex-items-center' href='<?php echo home_url(); ?>'>
							Sprawdź inne usługi
						</a>
						
					</div>
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	