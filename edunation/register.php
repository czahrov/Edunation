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

if( isset( $_GET[ 'meeting' ] ) ){
	$_SESSION[ 'temp' ] = array_merge( $_SESSION[ 'temp' ], $_POST );
	print_r( $_SESSION[ 'temp' ] );
	
}

