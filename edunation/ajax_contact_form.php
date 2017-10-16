<?php
/*
	Template Name: AJAX - formularz kontaktowy
*/

if( $_SERVER["HTTP_X_REQUESTED_WITH"] !== "XMLHttpRequest" ){
	header( "Location:" . home_url() );
	exit;
	
}

// print_r( $_POST );
// exit;

$name = filter_input( INPUT_POST, 'imie', FILTER_SANITIZE_STRING );
$mail = filter_input( INPUT_POST, 'email', FILTER_VALIDATE_EMAIL );
$subject = filter_input( INPUT_POST, 'subject', FILTER_SANITIZE_STRING );
$msg = filter_input( INPUT_POST, 'msg', FILTER_SANITIZE_STRING );

$errs = array();

if( strlen( $name ) === 0 ){
	$errs[] = "Pole [imię] jest puste";
}

if( $mail === false ){
	$errs[] = "Pole [email] jest niepoprawne";
}

if( strlen( $subject ) === 0 ){
	$errs[] = "Pole [temat] jest puste";
}

if( strlen( $msg ) === 0 ){
	$errs[] = "Pole [Wiadomość] jest puste";
}

if( count( $errs ) > 0 ){
	echo json_encode( array(
		'status' => 'fail',
		'msg' => implode( "<br>", $errs ),
		
	) );
	
}
else{
	require_once get_template_directory() . "/php/PHPMailer/PHPMailerAutoload.php";
	$mailer = new PHPMailer;
	$mailer->CharSet = "utf-8";
	$mailer->Encoding = "base64";
	$mailer->setLanguage( 'pl' );
	
	$mailer->setFrom( "noreply@{$_SERVER[ 'HTTP_HOST' ]}", 'Formularz kontaktowy Edunation' );
	// $mailer->addAddress( 'lucas@edunation.pl' );
	$mailer->addAddress( $mail );
	$mailer->addReplyTo( $mail );
	$mailer->Subject = sprintf( "%s przesyła nową wiadomość", $name );
	$mailer->Body = sprintf( "%s <%s>\r\nPrzesyła wiadomość na temat: %s\r\nO treści:\r\n%s\r\n\r\n---\r\nWiadomość wygenerowana automatycznie na stronie %s", 
		$name,
		$mail,
		$subject,
		$msg,
		home_url()
	);
	
	if( $mailer->send() ){
		echo json_encode( array(
			'status' => 'ok',
			'msg' => 'Wiadomość wysłana pomyślnie!',
			
		) );
		
	}
	else{
		echo json_encode( array(
			'status' => 'fail',
			'msg' => 'Wystąpił błąd.<br>Powód: ' . $mailer->ErrorInfo,
			
		) );
		
	}
	
}
