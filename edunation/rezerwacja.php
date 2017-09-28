<?php
	/*
	Template Name: Rezerwacje
	*/
	get_header();
?>
<!--NAVIGATION -->
<body class='spaceTop <?php echo is_admin_bar_showing()?( 'admin' ):( '' ); ?>'>
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
				),
				array(
					'title' => $post->post_title,
					'cena' => $meta[ 'cena' ][0],
				)
				
			);
			
		?>
		<div id='rezerwacja' class='flex flex-column'>
			<div class='popup flex flex-items-center flex-justify-center'>
				<div class='box bg-light flex flex-wrap'>
					<div class='close pointer bg-blue-dark font-light flex flex-items-center flex-justify-center'>
						<div class='icon fa fa-times'></div>
						
					</div>
					<div class='head bold base1 flex flex-items-center flex-justify-center'>
						Wybierz godzinę
					</div>
					<div class='body grow flex flex-items-start text-center'>
						<?php
							$dataTime = array(
								'rano' => array(
									array(
										'h' => 10,
										'm' => 0,
									),
									array(
										'h' => 10,
										'm' => 30,
									),
									array(
										'h' => 11,
										'm' => 0,
									),
									array(
										'h' => 11,
										'm' => 30,
									),
									
								),
								'po południu' => array(
									array(
										'h' => 12,
										'm' => 0,
									),
									array(
										'h' => 12,
										'm' => 30,
									),
									array(
										'h' => 13,
										'm' => 0,
									),
									array(
										'h' => 13,
										'm' => 30,
									),
									array(
										'h' => 14,
										'm' => 0,
									),
									array(
										'h' => 14,
										'm' => 30,
									),
									array(
										'h' => 15,
										'm' => 0,
									),
									array(
										'h' => 15,
										'm' => 30,
									),
									array(
										'h' => 16,
										'm' => 0,
									),
									array(
										'h' => 16,
										'm' => 30,
									),
									
								),
								'wieczorem' => array(
									array(
										'h' => 17,
										'm' => 00,
									),
									
								),
								
							);
							
							foreach( $dataTime as $pora => $godziny ):
						?>
						<div class='pora base3'>
							<div class='title bold'>
								<?php echo $pora; ?>
							</div>
							<?php foreach( $godziny as $godzina ): ?>
								<div class='item pointer' h='<?php echo $godzina[ 'h' ]; ?>' m='<?php echo $godzina[ 'm' ] ?>'>
									<?php printf( "%s:%'02s", $godzina[ 'h' ], $godzina[ 'm' ] ); ?>
								</div>
							<?php endforeach; ?>
						</div>
						<?php endforeach; ?>
					</div>
					
				</div>
				
			</div>
			<div class='top text-center'>
				Grafik online
			</div>
			<div class='bot flex flex-justify-end'>
				<div class='view grow flex'>
					<div class='etap data hide base1 no-shrink flex flex-column'>
						<div class='head flex flex-items-center flex-justify-start'>
							<div class='today regular alt'>
								<?php echo date( 'd.m.Y' ); ?>
							</div>
							<div class='button pointer bold uppercase bg-blue-dark font-light flex flex-items-center'>
								dzisiaj
							</div>
							<div class='month grow flex flex-items-center flex-justify-center'>
								<div class='nav prev pointer bg-blue-dark font-light flex flex-items-center'>
									<div class='icon fa fa-chevron-left'></div>
									
								</div>
								<div class='name regular alt flex flex-items-center flex-justify-center'></div>
								<div class='nav next pointer bg-blue-dark font-light flex flex-items-center'>
									<div class='icon fa fa-chevron-right'></div>
									
								</div>
								
							</div>
							
						</div>
						<div class='body flex flex-column'>
							<div class='thead bold alt flex'>
								<?php
									$weekdays = array(
										'pn.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'nd.',
									);
									foreach( $weekdays as $day ):
								?>
								<div class='tcell base7 flex flex-items-end flex-justify-center'>
									<?php echo $day; ?>
								</div>
								<?php endforeach; ?>
							</div>
							<div class='tbody regular alt grow flex flex-wrap'>
								<?php
									for( $i=1; $i<=42; $i++ ):
									$day = $i % 7;
								?>
								<div class='tcell base7' wd='<?php echo $day; ?>'>
									<div class='text'></div>
								</div>
								<?php endfor; ?>
							</div>
							
						</div>
						
					</div>
					<div class='etap form base1 no-shrink flex flex-column'>
						<div class='title flex flex-items-center flex-justify-start'>
							Podaj swoje informacje kontaktowe
						</div>
						<form class='form flex flex-column'>
							<div class='label'>
								Imię i nazwisko*
							</div>
							<input class='input bold imie' type='text' name='imie'/>
							<div class='label'>
								E-mail*
							</div>
							<input class='input bold mail' type='email' name='mail'/>
							<div class='label'>
								Numer telefonu*
							</div>
							<input class='input bold tel' type='tel' name='tel'/>
							<div class='label'>
								Możesz zostawić nam wiadomość
							</div>
							<textarea class='textarea bold msg' name='msg'></textarea>
							
						</form>
						
					</div>
					<div class='etap summary base1 no-shrink flex flex-column flex-items-center'>
						<div class='title'>
							Wspaniale! Rezerwacja została przyjęta.
						</div>
						<div class='subtitle'>
							E-mail z potwierdzeniem jest już w drodze
						</div>
						<div class='table flex flex-items-center flex-justify-around'>
							<div class='tcell left text-center base3 flex flex-column'>
								<div class='title bold'>
									3 stycznia
								</div>
								<div class='subtitle'>
									czwartek 16.00
								</div>
								
							</div>
							<div class='tcell right text-center grow flex flex-column'>
								<div class='title bold'>
									Busines 1:1 Skype
								</div>
								<div class='subtitle'>
									45 minut | 50 zł
								</div>
								<div class='subtitle'>
									online
								</div>
								<div class='button bold pointer uppercase bg-blue-dark font-light flex-self-center flex flex-items-center'>
									Dodaj do kalendarza Google
								</div>
								
							</div>
							
						</div>
						<a class='button bg-blue-dark font-light bold uppercase flex flex-items-center'>
							Sprawdź inne usługi
						</a>
						
					</div>
					
				</div>
				<div class='side bg-blue-dark font-dark flex flex-column flex-items-center flex-self-start'>
					<div class='segment top bg-light flex flex-column flex-items-center flex-justify-center'>
						<div class='title bold'>
							<?php echo $data[ 'title' ]; ?>
						</div>
						<div class='cena'>
							<?php echo $data[ 'cena' ]; ?>
						</div>
						
					</div>
					<div class='segment bot bg-light flex flex-column flex-items-center flex-justify-center hide'>
						<div class='dzien text'>
							Termin: 3 sierpnia
						</div>
						<div class='godzina text'>
							Godzina: 16.00
						</div>
						
					</div>
					<div class='button form pointer bold bg-light font-dark flex flex-items-center'>
						<div class='title grow text-center'>
							Następny
						</div>
						<div class='icon fa fa-angle-right'></div>
						
					</div>
					<div class='button register pointer bold bg-light font-dark flex flex-items-center'>
						<div class='title grow text-center'>
							Rezerwuj
						</div>
						<div class='icon fa fa-angle-right'></div>
						
					</div>
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	
<!-- FOOTER -->
<?php get_footer(); ?>