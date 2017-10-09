<?php
/*
	Template Name: Podgląd szkoleń
*/

get_header();
get_template_part( 'template/menu' );

$DM = new DateManager( get_template_directory() . "/php/meetings.json" );
if( !empty( $_GET[ 'accept' ] ) ){
	$id = $_GET[ 'accept' ];
	
	if( $DM->statusDate( $id ) !== 'accepted' ){
		$item = $DM->getData( $id );
		$DM->statusDate( $id, 'accepted' );
		$DM->mailNotify( $item, 'accept' );
		
	}
	
}
elseif( !empty( $_GET[ 'cancel' ] ) ){
	$id = $_GET[ 'cancel' ];
	
	if( $DM->statusDate( $id ) !== 'canceled' ){
		$item = $DM->getData( $id );
		$DM->statusDate( $id, 'canceled' );
		$DM->mailNotify( $item, 'cancel' );
		$DM->delDate( $id );
		
	}
	
}

?>

<div id='spotkania' class='bg-blue-dark2'>
	<div class='kafelki grid flex flex-items-start flex-wrap'>
		<?php
			foreach( $DM->getData() as $timestamp => $date ):
			/*
			time => array( 
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
		<div class='item base1 base2-mm base3-dm' item='<?php echo $timestamp; ?>'>
			<div class='box flex flex-column'>
				<div class='head font-light bg-violet text-center flex flex-column flex-items-center flex-justify-end'>
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
					<div class='line bold flex flex-items-center flex-justify-between'>
						<div class=''>
							Data
						</div>
						<div class='font-green'>
							<?php echo date( "d.m.Y", $timestamp ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-items-center flex-justify-between'>
						<div class=''>
							Godzina
						</div>
						<div class='font-pink'>
							<?php echo date( "H:i", $timestamp ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-items-center flex-justify-between'>
						<div class=''>
							Cena
						</div>
						<div class='font-green'>
							<?php printf( "%.2f zł", $date[ 'price' ] ); ?>
						</div>
						
					</div>
					<div class='line bold flex flex-items-center flex-justify-between'>
						<div class=''>
							Email
						</div>
						<div class='font-pink'>
							<?php echo $date[ 'client' ][ 'mail' ]; ?>
						</div>
						
					</div>
					<div class='line bold flex flex-items-center flex-justify-between'>
						<div class=''>
							Telefon
						</div>
						<div class='font-green'>
							<?php echo $date[ 'client' ][ 'tel' ]; ?>
						</div>
						
					</div>
					<div class='line bold flex flex-items-center'>
						<div class=''>
							Wiadomość od klienta
						</div>
						
					</div>
					<div class='line flex flex-items-center'>
						<div class=''>
							<?php echo $date[ 'client' ][ 'msg' ]; ?>
						</div>
						
					</div>
					
				</div>
				<div class='foot flex flex-column flex-items-center flex-justify-center'>
					<?php if( $DM->statusDate( $timestamp ) !== 'accepted' ): ?>
					<a class='button pointer bg-green font-light bold flex flex-items-center' href='?accept=<?php echo $timestamp; ?>'>
						Potwierdź spotkanie
					</a>
					<?php
							endif;
							if( $DM->statusDate( $timestamp ) !== 'canceled' ):
					?>
					<a class='button pointer bg-pink font-light bold flex flex-items-center' href='?cancel=<?php echo $timestamp; ?>'>
						Odwołaj spotkanie
					</a>
					<?php endif; ?>
					
				</div>
				
			</div>
			
		</div>
		
		<?php endforeach; ?>
	</div>
	
</div>

<?php get_footer(); ?>

