<?php
/*
	Template Name: Podgląd szkoleń
*/

// $DM = new DateManager( get_template_directory() . "/php/meetings.json" );
$DM = DM();
if( !empty( $_GET[ 'accept' ] ) ){
	$id = $_GET[ 'accept' ];
	$status = $DM->statusDate( $id );
	if( $status !== false && $status !== 'accepted' ){
		$item = $DM->getData( $id );
		$DM->statusDate( $id, 'accepted' );
		$DM->mailNotify( $item, 'accept' );
		header( "Location:" . home_url( 'spotkania' ) );
		exit;
		
	}
	
}
elseif( !empty( $_GET[ 'cancel' ] ) ){
	$id = $_GET[ 'cancel' ];
	$status = $DM->statusDate( $id );
	if( $status !== false && $status !== 'canceled' ){
		$item = $DM->getData( $id );
		$DM->statusDate( $id, 'canceled' );
		$DM->mailNotify( $item, 'cancel' );
		$DM->delDate( $id );
		header( "Location:" . home_url( 'spotkania' ) );
		exit;
		
	}
	
}
elseif( !empty( $_GET[ 'remove' ] ) ){
	$id = $_GET[ 'remove' ];
	$status = $DM->statusDate( $id );
	if( $status !== false ){
		$DM->delDate( $id );
		header( "Location:" . home_url( 'spotkania' ) );
		exit;
		
	}
	
}

get_header();
get_template_part( 'template/menu' );

$items = $DM->getData();

echo "<!--";
// print_r( $items );
echo "-->";

?>

<script>
	window.meetings = JSON.parse( '<?php echo json_encode( $items, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS |JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE  ); ?>' );
</script>
<div id='spotkania' class='bg-blue-dark2'>
	<div class='kafelki grid flex flex-items-start flex-wrap'>
		<?php
			$now = date_create()->getTimestamp();
			foreach( $items as $timestamp => $date ):
			/*
			time => array( 
				'status' => null
				'name' => null
				'time' => null
				'duration' => null
				'price' => null
				'client' => array(
					'name' => null,
					'mail' => null,
					'tel' => null,
					'msg' => null,
				)
			)
		*/
		?>
		<div class='item base1 base2-mm base3-dm <?php echo $date[ 'status' ]; echo $timestamp < $now?( ' outdate ' ):( '' ); ?>' item='<?php echo $timestamp; ?>'>
			<div class='box flex flex-column'>
				<div class='head font-light bg-violet text-center flex flex-column flex-items-center flex-justify-end'>
					<div class='status flex flex-items-center flex-justify-center'>
						<div class='icon wait fa fa-clock-o' title='Spotkanie oczekuje decyzję'></div>
						<div class='icon accept fa fa-check' title='Spotkanie zostało zaakceptowane'></div>
						<div class='icon outdate fa fa-calendar-times-o' title='Termin spotkania już minął'></div>
						
					</div>
					<div class='title bold'>
						<?php echo $date[ 'name' ]; ?>
					</div>
					<div class='subtitle'>
						<?php echo $date[ 'client' ][ 'name' ]; ?>
					</div>
					<div class='box bold flex flex-items-center flex-justify-center'>
						<?php echo $date[ 'duration' ] . " min"; ?>
					</div>
					
				</div>
				<div class='body'>
					<div class='line bold flex flex-wrap flex-items-center flex-justify-between'>
						<div class=''>
							Data
						</div>
						<div class='font-green'>
							<?php echo date( "d.m.Y", $timestamp ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-wrap flex-items-center flex-justify-between'>
						<div class=''>
							Godzina
						</div>
						<div class='font-pink'>
							<?php echo date( "H:i", $timestamp ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-wrap flex-items-center flex-justify-between'>
						<div class=''>
							Cena
						</div>
						<div class='font-green'>
							<?php printf( "%.2f zł", $date[ 'price' ] ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-wrap flex-items-center flex-justify-between'>
						<div class=''>
							Email
						</div>
						<div class='font-pink'>
							<?php echo $date[ 'client' ][ 'mail' ]; ?>
						</div>
						
					</div>
					<div class='line bold flex flex-wrap flex-items-center flex-justify-between'>
						<div class=''>
							Telefon
						</div>
						<div class='font-green'>
							<?php echo $date[ 'client' ][ 'tel' ]; ?>
						</div>
						
					</div>
					<div class='line bold flex flex-wrap flex-items-center'>
						<div class=''>
							Wiadomość od klienta
						</div>
						
					</div>
					<div class='line flex flex-wrap flex-items-center'>
						<div class=''>
							<?php echo $date[ 'client' ][ 'msg' ]; ?>
						</div>
						
					</div>
					
				</div>
				<div class='foot flex flex-column flex-items-center flex-justify-center'>
					<?php if( $DM->statusDate( $timestamp ) !== 'accepted' ): ?>
					<a class='button accept pointer bg-green font-light bold flex flex-items-center' title='Akceptuje termin spotkania, dodaje zdarzenie do kalendarza google, klient otrzymuje powiadomienie' href='?accept=<?php echo $timestamp; ?>'>
						Potwierdź spotkanie
					</a>
					<?php
							endif;
							if( $DM->statusDate( $timestamp ) !== 'canceled' ):
					?>
					<a class='button cancel pointer bg-pink font-light bold flex flex-items-center' title='Odwołuje i usuwa spotkanie z listy, klient otrzymuje powiadomienie' href='?cancel=<?php echo $timestamp; ?>'>
						Odwołaj spotkanie
					</a>
					<?php endif; ?>
					<a class='button remove pointer bg-violet-light font-light bold flex flex-items-center' title='Usuwa spotkanie z listy, klient nie otrzymuje powiadomienia' href='?remove=<?php echo $timestamp; ?>'>
						Usuń spotkanie z listy
					</a>
					
				</div>
				
			</div>
			
		</div>
		
		<?php endforeach; ?>
	</div>
	
</div>

<?php get_footer(); ?>

