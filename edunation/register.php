<?php
/*
	Template Name: rejestracja - ajax
*/

if( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] !== 'XMLHttpRequest' ){
	header( "Location:" . home_url() );
	exit;
	
}

session_start();

if( empty( $_SESSION[ 'temp' ] ) ){
	$_SESSION[ 'temp' ] = array();
	
}

// $meeting_uri = get_template_directory() . "/php/meetings.json";
$DM = DM();

if( isset( $_GET[ 'meeting' ] ) ){
	$_SESSION[ 'temp' ] = array_merge( $_SESSION[ 'temp' ], $_POST );
	// print_r( $_SESSION[ 'temp' ] );
	
	$info = array_merge( $_SESSION[ 'temp' ][ 'data' ], $_SESSION[ 'temp' ][ 'form' ] );
	
	// $DM = new DateManager( $meeting_uri );
	$DM->setMail( $info[ 'mail' ] );
	
	$date = $DM->createDate();
	$date->setName( $info[ 'type' ] );
	$date->setPrice( (float)$info[ 'price' ] );
	$date->setDuration( (int)$info[ 'duration' ] );
	$dt = new DateTime( sprintf( "%s/%s/%s %s:%s", 
		$info[ 'date' ][ 'month' ] + 1,
		$info[ 'date' ][ 'day' ],
		$info[ 'date' ][ 'year' ],
		$info[ 'date' ][ 'hour' ],
		$info[ 'date' ][ 'minute' ] ) 
	);
	$date->setTime( $dt->getTimestamp() );
	$date->setClient( array(
		'name' => $info[ 'imie' ],
		'mail' => $info[ 'mail' ],
		'tel' => $info[ 'tel' ],
		'msg' => $info[ 'msg' ],
	) );
	
	echo $DM->addDate( $date );
	
}
elseif( !empty( $_GET[ 'slots' ] ) ){
	// echo $_GET[ 'slots' ];
	sscanf( $_GET[ 'slots' ], "%u;%u;%u;%u", $day, $month, $year, $duration );
	// $DM = new DateManager( $meeting_uri );
	echo json_encode( $DM->getSlots( $year, $month, $day, $duration ) );
	
}

