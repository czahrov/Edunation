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
				<div class='box bg-blue-dark flex flex-column'>
					<div class='segment head bg-light flex no-shrink flex-column'>
						<div class='type text-center bold'>
							<?php echo $data[ 'title' ]; ?>
						</div>
						<div class='line price bg-light flex no-shrink flex-column' price=<?php printf( "%.2f", $data[ 'cena' ] ); ?> duration=<?php echo $data[ 'czas' ]; ?> >
							<div class='value cost text-center bold'>
								<?php printf( "%.2f zł / %u min", $data[ 'cena' ], $data[ 'czas' ] ); ?>
							</div>
							
						</div>
						
					</div>
					<div class='segment body flex flex-column'>
						<div class='line time bg-light flex no-shrink flex-column'>
							<div class='info text-center regular alt'>
								Czas szkolenia:
							</div>
							<div class='value time text-center bold'></div>
							<div class='slider'></div>
							<div class='calculate info text-center bold'></div>
							
						</div>
						<form class='line form fp_form bg-light flex no-shrink flex-column'>
							<input class='input' type='text' name='person' placeholder='Imię i nazwisko *'>
							<input class='input' type='tel' name='phone' placeholder='Telefon kontaktowy *'>
							<textarea class='input' name='message' placeholder='Wiadomość'></textarea>
							
						</form>
						
					</div>
					<div class='segment foot no-shrink flex flex-column flex-items-center'>
						<div id='login' class='btn pointer bg-light bold'>
							Zaloguj do google
						</div>
						<div id='event' class='btn submit pointer bg-light bold'>
							Rezerwuj!
						</div>
						<div id='logout' class='btn pointer bg-light bold'>
							Wyloguj z google
						</div>
						<div class='msg'></div>
						
					</div>
					
				</div>
				
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
									<?php
										printf(
											'%2u:00 %s',
											$i>12?( $i - 12 ):( $i ),
											$i<13?( 'AM' ):( 'PM' )
											
										);
									?>
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
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	