<?php
/*
	Template Name: Ajax - rezerwacja mail
*/

if( $_SERVER["HTTP_X_REQUESTED_WITH"] !== "XMLHttpRequest" ){
	header( "Location:" . home_url() );
	exit;
	
}

require_once "php/PHPMailer/PHPMailerAutoload.php";

$mailer = new PHPMailer();

$mailer->CharSet = 'utf8';
$mailer->Encoding = 'base64';
$mailer->setLanguage( 'pl' );

$mailer->setFrom( "noreply@{$_SERVER['HTTP_HOST']}", "Rezerwacja online" );
if( DMODE ){
	$mailer->addAddress( "sprytne@scepter.pl" );
}
else{
	$mailer->addAddress( "{$_POST['mail']}" );
}
$mailer->Subject = "{$_POST['person']} rezerwuje spotkanie";
$mailer->Body = sprintf(
	'Imię i Nazwisko: %s
Nazwa szkolenia: %s
Termin szkolenia: %s, %s
Telefon kontaktowy: %s
Mail kontaktowy: %s
Wiadomość:
%s

---
Wiadomość wygenerowana automatycznie na stronie %s',
	$_POST['person'],
	$_POST['type'],
	$_POST['time'],
	$_POST['date'],
	$_POST['phone'],
	$_POST['mail'],
	$_POST['message'],
	home_url()
	
);

if( DMODE ){
	// print_r( $_POST );
	// echo $mailer->Body;
	
}

if( $mailer->send() ){
	echo json_encode( array(
		'status' => 'success',
		'msg' => "Great! It was easy, right? See you soon!<br><br>Niebawem otrzymasz potwierdzenie rezerwacji na Twój adres email.",
		
	) );
	
}
else{
	echo json_encode( array(
		'status' => 'fail',
		'msg' => "Wystąpił błąd. Proszę sprawdzić poprawność wprowadzonych danych i spróbować ponownie.",
		
	) );
	
	
}
